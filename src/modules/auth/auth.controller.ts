import { NextFunction, Request, Response } from 'express'
import { plainToClass } from 'class-transformer'
import { validate } from 'class-validator'
import { HttpException } from '../../middleware/error.middleware'
import { LoginRequest, LogoutRequest, RegisterRequest } from './auth.request'
import AuthService from './auth.service'
import { AuthResponse } from './auth.response'

export default class AuthController {
	public authService = new AuthService()

	public register = async (req: Request, res: Response, next: NextFunction) => {
		const registerRequest = plainToClass(RegisterRequest, req.body)
		try {
			const check = await validate(registerRequest)
			if (check.length > 0) throw new HttpException(400, check.toString())
			const result = await this.authService.register(registerRequest)
			const registerResponse = plainToClass(AuthResponse, result)
			res.status(200).json(registerResponse)
		} catch (e) {
			next(e)
		}
	}

	public login = async (req: Request, res: Response, next: NextFunction) => {
		const loginRequest = plainToClass(LoginRequest, req.body)
		try {
			const check = await validate(loginRequest)
			if (check.length > 0) throw new HttpException(400, check.toString())
			const result = await this.authService.login(loginRequest)

			const loginResponse = plainToClass(AuthResponse, result)
			res.status(200).json(loginResponse)
		} catch (e) {
			next(e)
		}
	}

	public logout = async (req: Request, res: Response, next: NextFunction) => {
		const logoutRequest = plainToClass(LogoutRequest, req.body)
		try {
			const check = await validate(logoutRequest)
			if (check.length > 0) throw new HttpException(400, check.toString())
			const { accessToken, refreshToken } = logoutRequest
			await this.authService.logout(accessToken, refreshToken)
			res.status(200).json({ message: 'SUCCESS' })
		} catch (e) {
			next(e)
		}
	}

	public refreshToken = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const accessToken = await this.authService.refreshToken(req.body.refreshToken)
			res.status(200).json({ accessToken })
		} catch (e) {
			next(e)
		}
	}
}
