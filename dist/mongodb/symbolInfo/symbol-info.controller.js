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
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const type_graphql_1 = require("type-graphql");
const error_utils_1 = __importDefault(require("../../utils/error.utils"));
const symbol_info_resolver_1 = require("./symbol-info.resolver");
class SymbolInfoController {
    constructor() {
        this.list = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const graphqlQuery = req.query.graphql;
                const symbolInfoSchema = yield (0, type_graphql_1.buildSchema)({
                    resolvers: [symbol_info_resolver_1.SymbolInfoResolver],
                });
                const e = (0, graphql_1.validate)(symbolInfoSchema, (0, graphql_1.parse)(graphqlQuery));
                if (e.length > 0) {
                    throw new error_utils_1.default(500, 'GRAPHQL_INVALID_FORMAT_QUERY', e);
                }
                const result = yield (0, graphql_1.graphql)({
                    schema: symbolInfoSchema,
                    source: graphqlQuery,
                });
                res.status(300).json(result.data);
            }
            catch (e) {
                next(e);
            }
        });
    }
}
exports.default = SymbolInfoController;
