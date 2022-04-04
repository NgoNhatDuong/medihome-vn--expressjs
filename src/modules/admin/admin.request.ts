import { Request } from 'express'

export class UserListRequest {
    page: number

    limit: number

    order: Record<string, 'asc' | 'desc'>

    public static fromRequest(request: Request) {
        const ins = new UserListRequest()
        ins.page = Number(request.body._page) || 1
        ins.limit = Number(request.body._limit) || 10
        ins.order = request.body._order || {}

        return ins
    }
}

export class TokenListRequest {
    page: number

    limit: number

    order: Record<string, 'asc' | 'desc'>

    public static fromRequest(request: Request) {
        const ins = new TokenListRequest()
        ins.page = Number(request.body._page) || 1
        ins.limit = Number(request.body._limit) || 10
        ins.order = request.body._order || {}

        return ins
    }
}
