import { Exclude, Expose, Type } from 'class-transformer'

@Exclude()
export class ProductListRequest {
	@Expose()
	@Type(() => Number)
	_page?: number

	@Expose()
	@Type(() => Number)
	_limit?: number

	@Expose()
	_order?: 'ASC' | 'DESC'

	@Expose()
	_sort?: string
}

@Exclude()
export class ProductAddRequest {
	@Expose()
	name: string

	@Expose()
	@Type(() => Number)
	quantity: number

	@Expose()
	@Type(() => Number)
	price: number

	@Expose()
	@Type(() => Date)
	createdAt: number
}

@Exclude()
export class ProductDetailRequest {
	@Expose()
	id: number
}

@Exclude()
export class ProductUpdateRequest {
	@Expose()
	id: number

	@Expose()
	name: string

	@Expose()
	@Type(() => Number)
	price: number
}
