import { Router } from 'express'
import AuthController from './auth.controller'

export default class AuthRoute {
    public router = Router()

    public authController = new AuthController()

    constructor() {
        this.initializeRoute()
    }

    private initializeRoute() {
        this.router.post('/auth/register', this.authController.register)
        this.router.post('/auth/login', this.authController.login)
        this.router.post('/auth/logout', this.authController.logout)
        this.router.post('/auth/kickout', this.authController.kickout)
        this.router.post('/auth/refresh-token', this.authController.refreshToken)
        this.router.post('/auth/change-password', this.authController.changePassword)
        this.router.get('/auth/forgot-password', this.authController.forgotPassword)
        this.router.post('/auth/reset-password', this.authController.resetPassword)
    }
}
