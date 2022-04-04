import { NextFunction, Request, Response } from 'express'

export class HttpException extends Error {
    public status: number

    public message: string

    constructor(status?: number, message?: string) {
        super(message)
        this.status = status
        this.message = message
    }
}

export const errorMiddleware = (
    err: HttpException,
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const status = err.status || 500
    const message = err.message || 'Some thing when wrong'
    res.status(status).json({ message })
}

// HTTP status code
// 401 Unauthorized
// 403 Forbidden
// 429 Too Many Requests
// 498 Invalid Token
// 499 Token Required
