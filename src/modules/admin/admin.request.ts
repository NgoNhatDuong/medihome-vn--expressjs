import { Exclude, Expose, Type } from 'class-transformer'

@Exclude()
export class UserListRequest {
	@Expose()
	@Type(() => Number)
	_page?: number

	@Expose()
	@Type(() => Number)
	_limit?: number

	@Expose()
	_order?: 'asc' | 'desc'

	@Expose()
	_sort?: string
}

@Exclude()
export class TokenListRequest {
	@Expose()
	@Type(() => Number)
	_page?: number

	@Expose()
	@Type(() => Number)
	_limit?: number

	@Expose()
	_order?: 'asc' | 'desc'

	@Expose()
	_sort?: string
}
