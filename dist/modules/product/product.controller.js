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
const class_transformer_1 = require("class-transformer");
const product_request_1 = require("./product.request");
const Logger_1 = __importDefault(require("../../common/Logger"));
const product_service_1 = __importDefault(require("./product.service"));
class ProductController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const productListRequest = (0, class_transformer_1.plainToClass)(product_request_1.ProductListRequest, req.query);
            try {
                const result = yield product_service_1.default.list(productListRequest);
                res.status(300).json(result);
            }
            catch (error) {
                console.log(error);
                res.status(404).json({ error: error.message });
            }
        });
    }
    add(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const productAddRequest = (0, class_transformer_1.plainToClass)(product_request_1.ProductAddRequest, req.body);
            try {
                const result = yield product_service_1.default.add(productAddRequest);
                res.status(300).json(result);
            }
            catch (error) {
                console.log(error);
                res.status(404).json({ error });
            }
        });
    }
    details(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const productDetailRequest = (0, class_transformer_1.plainToClass)(product_request_1.ProductDetailRequest, req.params);
            console.log('================================');
            console.log('req.params', req.params);
            console.log('productDetailRequest', productDetailRequest);
            console.log('================================');
            try {
                const result = yield product_service_1.default.details(productDetailRequest);
                res.status(300).json(result);
            }
            catch (error) {
                console.log(error);
                res.status(404).json({ error });
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            Logger_1.default.request(req);
            const productUpdateRequest = (0, class_transformer_1.plainToClass)(product_request_1.ProductUpdateRequest, req.body);
            try {
                console.log(productUpdateRequest);
                const result = 2;
                res.status(300).json(result);
            }
            catch (error) {
                console.log(error);
                res.status(404).json({ error });
            }
        });
    }
}
exports.default = ProductController;
