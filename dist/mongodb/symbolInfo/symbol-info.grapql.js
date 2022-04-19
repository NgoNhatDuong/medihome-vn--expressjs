"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const symbol_info_repo_1 = __importDefault(require("./symbol-info.repo"));
class SymbolInfoGraphQL {
}
exports.default = SymbolInfoGraphQL;
_a = SymbolInfoGraphQL;
SymbolInfoGraphQL.symbolDailyType = new graphql_1.GraphQLObjectType({
    name: 'symbolDaily',
    fields: {
        _id: { type: graphql_1.GraphQLString },
        s: { type: graphql_1.GraphQLString },
        dt: { type: graphql_1.GraphQLString },
        o: { type: graphql_1.GraphQLFloat },
        h: { type: graphql_1.GraphQLFloat },
    },
});
SymbolInfoGraphQL.symbolInfoType = new graphql_1.GraphQLObjectType({
    name: 'symbolInfo',
    fields: {
        _id: { type: graphql_1.GraphQLString },
        m: { type: graphql_1.GraphQLString },
        n1: { type: graphql_1.GraphQLString },
        n2: { type: graphql_1.GraphQLString },
        t: { type: graphql_1.GraphQLString },
        o: { type: graphql_1.GraphQLFloat },
        h: { type: graphql_1.GraphQLFloat },
        l: { type: graphql_1.GraphQLFloat },
        c: { type: graphql_1.GraphQLFloat },
        ch: { type: graphql_1.GraphQLFloat },
        r: { type: graphql_1.GraphQLFloat },
        daily: {
            type: new graphql_1.GraphQLList(SymbolInfoGraphQL.symbolDailyType),
            resolve: (parent, args, context, info) => __awaiter(void 0, void 0, void 0, function* () { return []; }),
        },
    },
});
SymbolInfoGraphQL.rootSchema = new graphql_1.GraphQLSchema({
    query: new graphql_1.GraphQLObjectType({
        name: 'rootSchema',
        fields: {
            symbolInfoList: {
                type: new graphql_1.GraphQLList(SymbolInfoGraphQL.symbolInfoType),
                description: 'List of all SymbolInfo',
                args: {
                    limit: { type: graphql_1.GraphQLInt },
                    page: { type: graphql_1.GraphQLInt },
                },
                resolve: (parent, args, context, info) => __awaiter(void 0, void 0, void 0, function* () { return symbol_info_repo_1.default.find({ limit: args.limit, page: args.page }); }),
            },
        },
    }),
});
