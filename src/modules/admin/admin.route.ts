import { Router } from 'express'
import AdminController from './admin.controller'

export default class AdminRoute {
    public router = Router()

    public adminController = new AdminController()

    constructor() {
        this.initializeRoute()
    }

    private initializeRoute() {
        this.router.get('/admin/user-list', this.adminController.userList)
        this.router.get('/admin/token-list', this.adminController.tokenList)
    }
}
