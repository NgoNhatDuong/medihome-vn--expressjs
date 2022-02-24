import { Request, Response } from 'express'
import { datetimeToString } from './Format'

export default class Logger {
	public static request(req: Request): void {
		const datetime = datetimeToString(new Date(), 'YYYY/MM/DD hh:mm:ss')
		const info = {
			url: req.originalUrl,
			method: req.method,
			body: req.body,
			params: req.params,
		}
		const messager = `[${datetime}] - ${JSON.stringify(info)}`
		console.log(messager)
	}

	public static response(res: Response): void {
		const datetime = datetimeToString(new Date(), 'YYYY/MM/DD hh:mm:ss')
		const info = {}
		const messager = `[${datetime}] - ${JSON.stringify(info)}`
		console.log(messager)
	}
}
