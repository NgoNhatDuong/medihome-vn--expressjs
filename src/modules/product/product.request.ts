export class ProductListRequest {
    _page?: number

    _limit?: number

    _order?: 'ASC' | 'DESC'

    _sort?: string
}

export class ProductAddRequest {
    name: string

    quantity: number

    price: number

    createdAt: number
}

export class ProductDetailRequest {
    id: number
}

export class ProductUpdateRequest {
    id: number

    name: string

    price: number
}
