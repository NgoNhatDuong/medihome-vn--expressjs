import express, { Express } from 'express'
import helmet from 'helmet'
import Env from './config/env.config'
import { errorMiddleware } from './middleware/error.middleware'
import AdminRoute from './modules/admin/admin.route'
import AuthRoute from './modules/auth/auth.route'
import ProductRoute from './modules/product/product.route'
import Logger from './utils/logger.utils'

export default class App {
    public PORT: number

    public app: Express

    constructor() {
        this.app = express()
        this.PORT = Env.server.PORT
    }

    public initialize() {
        this.initMiddleware()
        this.initRoutes()
        this.initErrorMiddleware()
        this.listen()
    }

    private initMiddleware() {
        this.app.use(helmet())
        this.app.use(express.json())
    }

    private initRoutes() {
        this.app.use('/', new AuthRoute().router)
        this.app.use('/', new ProductRoute().router)
        this.app.use('/', new AdminRoute().router)
    }

    private initErrorMiddleware() {
        this.app.use(errorMiddleware)
    }

    public listen() {
        this.app.listen(this.PORT, () => {
            Logger.info(`🚀 Server listening at: http://localhost:${this.PORT}`)
        })
    }
}
