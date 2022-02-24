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
const admin_request_1 = require("./admin.request");
const admin_service_1 = __importDefault(require("./admin.service"));
class AdminController {
    constructor() {
        this.authService = new admin_service_1.default();
        this.userList = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const userListRequest = (0, class_transformer_1.plainToClass)(admin_request_1.UserListRequest, req.body);
            try {
                const result = yield this.authService.userList(userListRequest);
                res.status(300).json(result);
            }
            catch (e) {
                next(e);
            }
        });
        this.tokenList = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const tokenListRequest = (0, class_transformer_1.plainToClass)(admin_request_1.TokenListRequest, req.body);
            try {
                const result = yield this.authService.tokenList(tokenListRequest);
                res.status(300).json(result);
            }
            catch (e) {
                next(e);
            }
        });
    }
}
exports.default = AdminController;
