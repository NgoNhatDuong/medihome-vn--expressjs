import { Router } from 'express'
import ProductController from './product.controller'

export default class ProductRoute {
	public router = Router()

	public productController = new ProductController()

	constructor() {
		this.initializeRoute()
	}

	private initializeRoute() {
		this.router.post('/api/v1/product/list', this.productController.list)
		this.router.post('/api/v1/product/trash', this.productController.list)
		this.router.post('/api/v1/product/add', this.productController.add)
		this.router.post('/api/v1/product/details/:id', this.productController.details)
		this.router.post('/api/v1/product/update/:id', this.productController.update)
		this.router.post('/api/v1/product/remove/:id', this.productController.update)
		this.router.post('/api/v1/product/restore/:id', this.productController.update)
		this.router.post('/api/v1/product/destroy/:id', this.productController.update)
	}
}
