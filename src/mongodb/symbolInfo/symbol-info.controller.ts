import { NextFunction, Request, Response } from 'express'
import { graphql, parse, validate } from 'graphql'
import { buildSchema } from 'type-graphql'
import ErrorUtils from '../../utils/error.utils'
import { SymbolInfoResolver } from './symbol-info.resolver'

export default class SymbolInfoController {
    public list = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const graphqlQuery = req.query.graphql as string

            const symbolInfoSchema = await buildSchema({
                resolvers: [SymbolInfoResolver], // add this
            })

            // validate
            const e = validate(symbolInfoSchema, parse(graphqlQuery))
            if (e.length > 0) {
                throw new ErrorUtils(500, 'GRAPHQL_INVALID_FORMAT_QUERY', e)
            }

            const result = await graphql({
                schema: symbolInfoSchema,
                source: graphqlQuery,
            })
            res.status(300).json(result.data)
        } catch (e) {
            next(e)
        }
    }
}
