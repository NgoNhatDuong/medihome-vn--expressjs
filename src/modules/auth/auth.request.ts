import jwt, { JwtPayload } from 'jsonwebtoken'
import { Request } from 'express'
import Env from '../../config/env.config'
import ValidateUtils from '../../utils/validate.utils'
import ErrorUtils from '../../utils/error.utils'

export class RegisterRequest {
    username: string

    password: string

    email: string

    phone: string

    public validate(): void {
        const message: string[] = []
        if (!ValidateUtils.isUsername(this.username)) message.push('Username is invalid')
        if (!ValidateUtils.isGmail(this.email)) message.push('Email must format: *****@gmail.com')
        if (!ValidateUtils.isPhone(this.phone)) message.push('Phone number must be actual')
        if (!ValidateUtils.isPassword(this.password)) message.push('Password is invalid')

        if (message.length > 0) {
            throw new ErrorUtils(409, 'VALIDATE_FAIL', message.join('.'))
        }
    }

    public static fromRequest(request: Request): RegisterRequest {
        const ins = new RegisterRequest()
        ins.username = request.body.username
        ins.password = request.body.password
        ins.email = request.body.email
        ins.phone = request.body.phone

        ins.validate()
        return ins
    }
}

export class LoginRequest {
    username: string

    password: string

    public validate(): void {
        if (!ValidateUtils.isPassword(this.password))
            throw new ErrorUtils(409, 'VALIDATE_FAIL', 'Password is invalid !')
    }

    public static fromRequest(request: Request): LoginRequest {
        const ins = new LoginRequest()
        ins.username = request.body.username
        ins.password = request.body.password
        ins.validate()
        return ins
    }
}

export class LogoutRequest {
    public accessToken: string

    public userId: number

    public validate(): void {
        try {
            const decoded = jwt.verify(this.accessToken, Env.jwt.accessKey) as JwtPayload
            this.userId = decoded.userId
        } catch (e) {
            throw new ErrorUtils(401, 'TOKEN_VALID', 'Token is invalid')
        }
    }

    public static fromRequest(request: Request) {
        const ins = new LogoutRequest()
        ins.accessToken = request.body.accessToken
        ins.validate()
        return ins
    }
}

export class KickoutRequest {
    public userId: number

    public accessToken: string

    public refreshToken: string[]

    public validate(): void {
        try {
            const decoded = jwt.verify(this.accessToken, Env.jwt.accessKey) as JwtPayload
            this.userId = decoded.userId
        } catch (e) {
            throw new ErrorUtils(401, 'TOKEN_VALID', 'Token is invalid')
        }
    }

    public static fromRequest(request: Request) {
        const ins = new KickoutRequest()
        ins.accessToken = request.body.accessToken
        ins.refreshToken = request.body.refreshToken || []
        ins.validate()
        return ins
    }
}

export class RefreshTokenRequest {
    public userId: number

    public refreshToken: string

    public validate(): void {
        try {
            const decoded = jwt.verify(this.refreshToken, Env.jwt.refreshKey) as JwtPayload
            this.userId = decoded.userId
        } catch (e) {
            throw new ErrorUtils(401, 'TOKEN_VALID', 'Token is invalid')
        }
    }

    public static fromRequest(request: Request) {
        const ins = new RefreshTokenRequest()
        ins.refreshToken = request.body.refreshToken
        ins.validate()
        return ins
    }
}

export class ForgotPasswordRequest {
    public email: string

    public validate() {
        if (!ValidateUtils.isGmail(this.email))
            throw new ErrorUtils(401, 'VALIDATE_FAIL', 'Email must format: *****@gmail.com !')
    }

    public static fromRequest(request: Request) {
        const ins = new ForgotPasswordRequest()
        ins.email = request.body.email
        ins.validate()
        return ins
    }
}

export class ChangePasswordRequest {
    public username: string

    public oldPassword: string

    public newPassword: string

    public validate() {
        if (!ValidateUtils.isPassword(this.oldPassword))
            throw new ErrorUtils(409, 'VALIDATE_FAIL', 'Password is invalid !')
        if (!ValidateUtils.isPassword(this.newPassword))
            throw new ErrorUtils(409, 'VALIDATE_FAIL', 'Password is invalid !')
    }

    public static fromRequest(request: Request) {
        const ins = new ChangePasswordRequest()
        ins.username = request.body.username
        ins.oldPassword = request.body.oldPassword
        ins.newPassword = request.body.newPassword
        ins.validate()
        return ins
    }
}

export class ResetPasswordRequest {
    public email: string

    public tokenReset: string

    public newPassword: string

    public validate() {
        if (!ValidateUtils.isPassword(this.newPassword))
            throw new ErrorUtils(409, 'VALIDATE_FAIL', 'Password is invalid !')
    }

    public static fromRequest(request: Request) {
        const ins = new ResetPasswordRequest()
        ins.email = request.body.email
        ins.tokenReset = request.body.tokenReset
        ins.newPassword = request.body.newPassword
        ins.validate()
        return ins
    }
}
