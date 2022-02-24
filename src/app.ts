import express, { NextFunction, Request, Response, Express } from 'express'
import helmet from 'helmet'
import Logger from './common/Logger'
import { colorLog } from './common/Utils'
import config from './config'
import TypeORMConnect from './databases/typeorm-connect'
import { errorMiddleware } from './middleware/error.middleware'
import AdminRoute from './modules/admin/admin.route'
import AuthRoute from './modules/auth/auth.route'
import ProductRoute from './modules/product/product.route'

export default class App {
	public PORT: number

	public app: Express

	constructor() {
		this.app = express()
		this.PORT = config.server.PORT

		this.init()
	}

	private async init() {
		await TypeORMConnect.connectMySQL()
		this.initializeMiddleware()
		this.initializeRoutes()
		this.initializeErrorMiddleware()
		this.listen()
	}

	private initializeMiddleware() {
		this.app.use(helmet())
		this.app.use(express.json())
		this.app.use((req: Request, res: Response, next: NextFunction) => {
			Logger.request(req)
			next()
		})
	}

	private initializeRoutes() {
		this.app.use('/', new AuthRoute().router)
		this.app.use('/', new ProductRoute().router)
		this.app.use('/', new AdminRoute().router)
	}

	private initializeErrorMiddleware() {
		this.app.use(errorMiddleware)
	}

	public listen() {
		this.app.listen(this.PORT, () => {
			console.log(
				`${colorLog.magenta}🚀 Server listening at: http://localhost:${this.PORT} ${colorLog.reset}`,
			)
		})
	}
}
