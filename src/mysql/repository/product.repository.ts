import { EntityRepository, Repository } from 'typeorm'
import ProductEntity from '../entity/product.entity'

@EntityRepository(ProductEntity)
export default class ProductRepository extends Repository<ProductEntity> {}
