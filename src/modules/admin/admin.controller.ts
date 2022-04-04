import { NextFunction, Request, Response } from 'express'
import { TokenListRequest, UserListRequest } from './admin.request'
import AdminService from './admin.service'

export default class AdminController {
    public authService = new AdminService()

    public userList = async (req: Request, res: Response, next: NextFunction) => {
        const userListRequest = UserListRequest.fromRequest(req)
        try {
            const result = await this.authService.userList(userListRequest)
            res.status(300).json(result)
        } catch (e) {
            next(e)
        }
    }

    public tokenList = async (req: Request, res: Response, next: NextFunction) => {
        const tokenListRequest = TokenListRequest.fromRequest(req)
        try {
            const result = await this.authService.tokenList(tokenListRequest)
            res.status(300).json(result)
        } catch (e) {
            next(e)
        }
    }
}
