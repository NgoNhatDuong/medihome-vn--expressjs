import {
    graphql,
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLInt,
    GraphQLList,
    GraphQLString,
    GraphQLFloat,
} from 'graphql'
import SymbolInfoService from './symbol-info.repo'

export default class SymbolInfoGraphQL {
    public static symbolDailyType = new GraphQLObjectType({
        name: 'symbolDaily',
        fields: {
            _id: { type: GraphQLString },
            s: { type: GraphQLString },
            dt: { type: GraphQLString },
            o: { type: GraphQLFloat },
            h: { type: GraphQLFloat },
        },
    })

    public static symbolInfoType = new GraphQLObjectType({
        name: 'symbolInfo',
        fields: {
            _id: { type: GraphQLString },
            m: { type: GraphQLString },
            n1: { type: GraphQLString },
            n2: { type: GraphQLString },
            t: { type: GraphQLString },
            o: { type: GraphQLFloat },
            h: { type: GraphQLFloat },
            l: { type: GraphQLFloat },
            c: { type: GraphQLFloat },
            ch: { type: GraphQLFloat },
            r: { type: GraphQLFloat },
            daily: {
                type: new GraphQLList(SymbolInfoGraphQL.symbolDailyType),
                resolve: async (parent, args, context, info) => [],
                // return await SymbolInfoMongo.findSymbolDailyBy({ s: parent._id })
            },
        },
    })

    public static rootSchema = new GraphQLSchema({
        query: new GraphQLObjectType({
            name: 'rootSchema',
            fields: {
                symbolInfoList: {
                    type: new GraphQLList(SymbolInfoGraphQL.symbolInfoType),
                    description: 'List of all SymbolInfo',
                    args: {
                        limit: { type: GraphQLInt },
                        page: { type: GraphQLInt },
                    },
                    resolve: async (parent, args, context, info) =>
                        SymbolInfoService.find({ limit: args.limit, page: args.page }),
                },
            },
        }),
    })
}
