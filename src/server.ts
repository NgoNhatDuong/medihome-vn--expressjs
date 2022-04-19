import express, { Express } from 'express'
import helmet from 'helmet'
import SymbolInfoRoute from './mongodb/symbolInfo/symbol-info.route'
import { errorMiddleware } from './middleware/error.middleware'
import AdminRoute from './modules/admin/admin.route'
import AuthRoute from './modules/auth/auth.route'
import ProductRoute from './modules/product/product.route'

export default class Server {
    public PORT: number

    public app: Express

    constructor(port: number) {
        this.app = express()
        this.PORT = port
    }

    public initialize() {
        this.initMiddleware()
        this.initRoutes()
        this.initErrorMiddleware()
    }

    private initMiddleware() {
        this.app.use(helmet())
        this.app.use(express.json())
    }

    private initRoutes() {
        this.app.use('/', new AuthRoute().router)
        this.app.use('/', new ProductRoute().router)
        this.app.use('/', new AdminRoute().router)
        this.app.use('/', new SymbolInfoRoute().router)
    }

    private initErrorMiddleware() {
        this.app.use(errorMiddleware)
    }
}
