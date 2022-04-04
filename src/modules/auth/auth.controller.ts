import { NextFunction, Request, Response } from 'express'
import {
    ChangePasswordRequest,
    ForgotPasswordRequest,
    KickoutRequest,
    LoginRequest,
    LogoutRequest,
    RefreshTokenRequest,
    RegisterRequest,
    ResetPasswordRequest,
} from './auth.request'
import AuthService from './auth.service'
import { AuthResponse } from './auth.response'

export default class AuthController {
    public authService = new AuthService()

    public register = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { username, password, email, phone } = RegisterRequest.fromRequest(req)
            const result = await this.authService.register(username, password, email, phone)
            const registerResponse = AuthResponse.fromData(result)
            res.status(200).json(registerResponse)
        } catch (e) {
            next(e)
        }
    }

    public login = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { username, password } = LoginRequest.fromRequest(req)
            const result = await this.authService.login(username, password)
            const loginResponse = AuthResponse.fromData(result)
            res.status(200).json(loginResponse)
        } catch (e) {
            next(e)
        }
    }

    public logout = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { accessToken, userId } = LogoutRequest.fromRequest(req)
            await this.authService.logout(userId, accessToken)
            res.status(200).json({ message: 'SUCCESS' })
        } catch (e) {
            next(e)
        }
    }

    public kickout = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { userId, refreshToken } = KickoutRequest.fromRequest(req)
            await this.authService.kickout(userId, refreshToken)
            res.status(200).json({ message: 'SUCCESS' })
        } catch (e) {
            next(e)
        }
    }

    public refreshToken = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { userId, refreshToken } = RefreshTokenRequest.fromRequest(req)
            const accessToken = await this.authService.refreshToken(userId, refreshToken)
            res.status(200).json({ accessToken })
        } catch (e) {
            next(e)
        }
    }

    public changePassword = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { username, oldPassword, newPassword } = ChangePasswordRequest.fromRequest(req)
            const result = await this.authService.changePassword(username, oldPassword, newPassword)
            const changePasswordResponse = AuthResponse.fromData(result)
            res.status(200).json(changePasswordResponse)
        } catch (e) {
            next(e)
        }
    }

    public forgotPassword = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { email } = ForgotPasswordRequest.fromRequest(req)
            await this.authService.forgotPassword(email)
            res.status(200).json({ message: 'SUCCESS' })
        } catch (e) {
            next(e)
        }
    }

    public resetPassword = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { email, tokenReset, newPassword } = ResetPasswordRequest.fromRequest(req)
            const result = await this.authService.resetPassword(email, tokenReset, newPassword)
            const resetPasswordResponse = AuthResponse.fromData(result)
            res.status(200).json(resetPasswordResponse)
        } catch (e) {
            next(e)
        }
    }
}
