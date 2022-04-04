import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { EntityManager, In } from 'typeorm'
import Env from '../../config/env.config'
import MailerConnection from '../../config/mailer.config'
import { HttpException } from '../../middleware/error.middleware'
import TokenEntity from '../../mysql/entity/token.entity'
import UserEntity from '../../mysql/entity/user.entity'
import MyString from '../../utils/string.utils'
import db from '../../config/typeorm.config'

export default class AuthService {
    async generateToken(manager: EntityManager, user: UserEntity) {
        const accessToken = jwt.sign({ userId: user.userId }, Env.jwt.accessKey, {
            expiresIn: Env.jwt.accessTime,
        })
        const refreshToken = jwt.sign({ userId: user.userId }, Env.jwt.refreshKey, {
            expiresIn: Env.jwt.refreshTime,
        })
        const createToken = manager.create(TokenEntity, {
            userId: user.userId,
            accessToken,
            refreshToken,
            expiresIn: new Date(new Date().getTime() + Env.jwt.refreshTime * 1000),
            status: 'active',
        })
        const token = await manager.save(createToken)
        return token
    }

    async register(username: string, password: string, email: string, phone: string) {
        const response = await db.manager.transaction(async manager => {
            const findUser = await manager.findOne(UserEntity, {
                where: [{ username }, { email }],
            })
            if (findUser) throw new HttpException(401, 'Username or Email is already exist')

            const hashPassword = await bcrypt.hash(password, 5)
            const createUser = manager.create(UserEntity, {
                username,
                email,
                phone,
                password: hashPassword,
            })
            const user = await manager.save(createUser)
            const token = await this.generateToken(manager, user)

            return {
                userInfo: user,
                accessToken: token.accessToken,
                refreshToken: token.refreshToken,
            }
        })

        return response
    }

    async login(username: string, password: string) {
        const user = await db.manager.findOneBy(UserEntity, { username })

        if (!user) throw new HttpException(404, 'Username is not exist')

        const checkPassword = await bcrypt.compare(password, user.password)
        if (!checkPassword) throw new HttpException(404, 'Password is incorrect')

        const token = await this.generateToken(db.manager, user)
        return {
            accessToken: token.accessToken,
            refreshToken: token.refreshToken,
            userInfo: user,
        }
    }

    async logout(userId: number, accessToken: string) {
        await db.manager.update(
            TokenEntity,
            {
                userId,
                accessToken,
                status: 'active',
            },
            { status: 'deactive' },
        )
    }

    async kickout(userId: number, refreshToken: string[]) {
        let conditions: Record<string, unknown> = {}
        if (refreshToken.length > 0) {
            conditions = { refreshToken: In(refreshToken) }
        }

        await db.manager.update(
            TokenEntity,
            {
                userId,
                ...conditions,
                status: 'active',
            },
            { status: 'deactive' },
        )
    }

    async refreshToken(userId: number, refreshToken: string) {
        const findToken = await db.manager.findOneBy(TokenEntity, {
            refreshToken,
            status: 'active',
        })
        if (!findToken) throw new HttpException(404, 'Token is deactive')

        findToken.accessToken = jwt.sign({ userId }, Env.jwt.accessKey, {
            expiresIn: Env.jwt.accessTime,
        })
        const token = await db.manager.save(findToken)

        return token.accessToken
    }

    async changePassword(username: string, oldPassword: string, newPassword: string) {
        const user = await db.manager.findOneBy(UserEntity, { username })
        if (!user) throw new HttpException(404, 'Username is not exist')

        const checkPassword = await bcrypt.compare(oldPassword, user.password)
        if (!checkPassword) throw new HttpException(404, 'Password is incorrect')

        user.password = await bcrypt.hash(newPassword, 5)

        await db.manager.save(user)

        // sau khi đổi mật khẩu cần kickout tất cả các nơi đã đăng nhập, sau đó tạo token mới
        await this.kickout(user.userId, [])
        const token = await this.generateToken(db.manager, user)
        return {
            userInfo: user,
            accessToken: token.accessToken,
            refreshToken: token.refreshToken,
        }
    }

    async forgotPassword(email: string) {
        const user = await db.manager.findOneBy(UserEntity, { email })
        if (!user) throw new HttpException(404, 'Email is not exist')

        const randomString = MyString.randomString(10)
        const encriptString = MyString.encript(randomString, user.username)
        const expiresIn = new Date(new Date().getTime() + 60 * 60 * 1000)

        const ftoken = db.manager.create(TokenEntity, {
            userId: user.userId,
            forgotToken: encriptString,
            expiresIn,
            status: 'forgot',
        })

        await db.manager.save(ftoken)

        await MailerConnection.transporter.sendMail({
            from: Env.email.username,
            to: email,
            subject: 'Medihome - Reset Password',
            html: ` <p>Your username: ${user.username}</p>
                    <a href="https://medihome.vn/reset-password?email=${email}&token=${randomString}">
                        Click here to reset Password !!!
                    </a>
                    `,
        })
    }

    async resetPassword(email: string, tokenReset: string, newPassword: string) {
        const user = await db.manager.findOneBy(UserEntity, { email })
        if (!user) throw new HttpException(404, 'Email is not exist')

        const encriptString = MyString.encript(tokenReset, user.username)
        const ftoken = await db.manager.findOneBy(TokenEntity, {
            userId: user.userId,
            forgotToken: encriptString,
            status: 'forgot',
        })
        if (!ftoken) throw new HttpException(404, 'Token is invalid')

        if (ftoken.expiresIn.getTime() < new Date().getTime()) {
            throw new HttpException(404, 'Token has expired')
        }

        user.password = await bcrypt.hash(newPassword, 5)
        ftoken.status = 'deactive'
        await db.manager.save([user, ftoken])

        // sau khi đổi mật khẩu cần kickout tất cả các nơi đã đăng nhập, sau đó tạo token mới
        await this.kickout(user.userId, [])
        const token = await this.generateToken(db.manager, user)
        return {
            userInfo: user,
            accessToken: token.accessToken,
            refreshToken: token.refreshToken,
        }
    }
}
