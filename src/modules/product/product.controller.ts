import { Request, Response } from 'express'
import { plainToClass } from 'class-transformer'
import {
	ProductDetailRequest,
	ProductAddRequest,
	ProductListRequest,
	ProductUpdateRequest,
} from './product.request'
import Logger from '../../common/Logger'
import ProductService from './product.service'

export default class ProductController {
	public async list(req: Request, res: Response): Promise<any> {
		const productListRequest = plainToClass(ProductListRequest, req.query)
		try {
			const result = await ProductService.list(productListRequest)
			res.status(300).json(result)
		} catch (error) {
			console.log(error)
			res.status(404).json({ error: error.message })
		}
	}

	public async add(req: Request, res: Response): Promise<any> {
		const productAddRequest = plainToClass(ProductAddRequest, req.body)
		try {
			const result = await ProductService.add(productAddRequest)
			res.status(300).json(result)
		} catch (error) {
			console.log(error)
			res.status(404).json({ error })
		}
	}

	public async details(req: Request, res: Response): Promise<any> {
		const productDetailRequest = plainToClass(ProductDetailRequest, req.params)
		console.log('================================')
		console.log('req.params', req.params)
		console.log('productDetailRequest', productDetailRequest)
		console.log('================================')

		try {
			const result = await ProductService.details(productDetailRequest)
			res.status(300).json(result)
		} catch (error) {
			console.log(error)
			res.status(404).json({ error })
		}
	}

	public async update(req: Request, res: Response): Promise<any> {
		Logger.request(req)
		const productUpdateRequest = plainToClass(ProductUpdateRequest, req.body)
		try {
			console.log(productUpdateRequest)

			// const result = await ProductService.details(productUpdateRequest)
			const result = 2
			res.status(300).json(result)
		} catch (error) {
			console.log(error)
			res.status(404).json({ error })
		}
	}
}
