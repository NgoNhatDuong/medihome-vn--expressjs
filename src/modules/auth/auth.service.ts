import bcrypt from 'bcrypt'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { EntityManager, getCustomRepository, getManager, In } from 'typeorm'
import TokenRepository from '../../databases/repository/token.repository'
import UserEntity from '../../databases/entity/user.entity'
import { HttpException } from '../../middleware/error.middleware'
import config from '../../config'
import TokensEntity from '../../databases/entity/token.entity'

export default class AuthService {
	public tokenRepository: TokenRepository

	public entityManager: EntityManager

	constructor() {
		this.tokenRepository = getCustomRepository(TokenRepository)
		this.entityManager = getManager()
	}

	async register(req: { username: string; password: string; email: string; phone: string }) {
		const response = await getManager().transaction(async entityManager => {
			const findUser = await entityManager.findOne(UserEntity, { username: req.username })
			if (findUser) throw new HttpException(401, 'Username is already exist')

			// create new user
			const hashPassword = await bcrypt.hash(req.password, 5)
			const createUser = entityManager.create(UserEntity, {
				username: req.username,
				password: hashPassword,
				email: req.email,
				phone: req.phone,
			})
			const user = await entityManager.save(createUser)
			const token = await this.generateToken(entityManager, user)

			return {
				userInfo: user,
				accessToken: token.accessToken,
				refreshToken: token.refreshToken,
			}
		})

		return response
	}

	async login({ username, password }) {
		const user = await this.entityManager.findOne(UserEntity, { username })
		if (!user) throw new HttpException(404, 'Username is not exist')

		const checkPassword = await bcrypt.compare(password, user.password)
		if (!checkPassword) throw new HttpException(404, 'Password is incorrect')

		const token = await this.generateToken(this.entityManager, user)
		return {
			accessToken: token.accessToken,
			refreshToken: token.refreshToken,
			userInfo: user,
		}
	}

	async logout(accessToken: string, refreshToken?: string[]) {
		let decoded: JwtPayload
		try {
			decoded = jwt.verify(accessToken, config.jwt.accessKey) as JwtPayload
		} catch (e) {
			throw new HttpException(401, 'Token is invalid')
		}

		let conditions: Record<string, unknown> = {}
		if (!refreshToken) {
			conditions = { accessToken }
		} else if (refreshToken.length === 0) {
			conditions = {}
		} else if (refreshToken.length > 0) {
			conditions = { refreshToken: In(refreshToken) }
		}

		await this.entityManager.update(
			TokensEntity,
			{
				userId: decoded.userId,
				...conditions,
				status: 'active',
			},
			{ status: 'deactive' },
		)
	}

	async refreshToken(refreshToken: string) {
		let decoded: JwtPayload
		try {
			decoded = jwt.verify(refreshToken, config.jwt.refreshKey) as JwtPayload
		} catch (e) {
			throw new HttpException(401, 'Token is invalid')
		}

		const findToken = await this.entityManager.findOne(TokensEntity, {
			refreshToken,
			status: 'active',
		})
		if (!findToken) throw new HttpException(404, 'Token is deactive')

		findToken.accessToken = jwt.sign({ userId: decoded.userId }, config.jwt.accessKey, {
			expiresIn: config.jwt.accessTime,
		})
		const token = await this.entityManager.save(findToken)

		return token.accessToken
	}

	async generateToken(entityManager: EntityManager, user: UserEntity) {
		const accessToken = jwt.sign({ userId: user.userId }, config.jwt.accessKey, {
			expiresIn: config.jwt.accessTime,
		})
		const refreshToken = jwt.sign({ userId: user.userId }, config.jwt.refreshKey, {
			expiresIn: config.jwt.refreshTime,
		})
		const createToken = entityManager.create(TokensEntity, {
			user,
			accessToken,
			refreshToken,
			expiresIn: new Date(new Date().getTime() + config.jwt.refreshTime * 1000),
			status: 'active',
		})
		const token = await entityManager.save(createToken)
		return token
	}
}
