import { getCustomRepository } from 'typeorm'
import TokenRepository from '../../databases/repository/token.repository'
import UserRepository from '../../databases/repository/user.repository'
import { TokenListRequest, UserListRequest } from './admin.request'

export default class AdminService {
	public userRepository: UserRepository

	public tokenRepository: TokenRepository

	constructor() {
		this.userRepository = getCustomRepository(UserRepository)
		this.tokenRepository = getCustomRepository(TokenRepository)
	}

	async userList(req: UserListRequest) {
		const result = await this.userRepository.find({
			take: req._limit,
			skip: req._limit * req._page,
			...(req._sort ? { order: { [req._sort]: req._order || 'ASC' } } : {}),
		})

		return result
	}

	async tokenList(req: TokenListRequest) {
		const result = await this.tokenRepository.find({
			take: req._limit,
			skip: req._limit * req._page,
			...(req._sort ? { order: { [req._sort]: req._order || 'ASC' } } : {}),
		})

		return result
	}
}
