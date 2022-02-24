import { getCustomRepository } from 'typeorm'
import { ProductAddRequest, ProductDetailRequest, ProductListRequest } from './product.request'
import ProductRepository from '../../databases/repository/product.repository'

export default class ProductService {
	static async list(req: ProductListRequest) {
		const productRepository = getCustomRepository(ProductRepository)
		const result = await productRepository.find({
			take: req._limit,
			skip: req._limit * req._page,
			...(req._sort ? { order: { [req._sort]: req._order || 'ASC' } } : {}),
		})

		return result
	}

	static async add(req: ProductAddRequest): Promise<any> {
		const productRepository = getCustomRepository(ProductRepository)
		const product = productRepository.create()
		product.name = req.name
		product.price = req.price
		product.quantity = req.quantity

		const result = await productRepository.save(product)

		return result
	}

	static async details(req: ProductDetailRequest) {
		const productRepository = getCustomRepository(ProductRepository)
		const result = await productRepository.findOne({ id: req.id })

		return result
	}
}
