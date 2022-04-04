// import { Request, Response } from 'express'
// import MyDatetime from './MyDatetime'

// export default class Logger {
//     public static request(req: Request): void {
//         const datetime = MyDatetime.timeToText(new Date(), 'YYYY/MM/DD hh:mm:ss')
//         const info = {
//             url: req.originalUrl,
//             method: req.method,
//             body: req.body,
//             params: req.params,
//         }
//         const messager = `[${datetime}] - ${JSON.stringify(info)}`
//         console.log(messager)
//     }

//     public static response(res: Response): void {
//         const datetime = MyDatetime.timeToText(new Date(), 'YYYY/MM/DD hh:mm:ss')
//         const info = {}
//         const messager = `[${datetime}] - ${JSON.stringify(info)}`
//         console.log(messager)
//     }
// }
