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
const class_validator_1 = require("class-validator");
const error_middleware_1 = require("../../middleware/error.middleware");
const auth_request_1 = require("./auth.request");
const auth_service_1 = __importDefault(require("./auth.service"));
const auth_response_1 = require("./auth.response");
class AuthController {
    constructor() {
        this.authService = new auth_service_1.default();
        this.register = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const registerRequest = (0, class_transformer_1.plainToClass)(auth_request_1.RegisterRequest, req.body);
            try {
                const check = yield (0, class_validator_1.validate)(registerRequest);
                if (check.length > 0)
                    throw new error_middleware_1.HttpException(400, check.toString());
                const result = yield this.authService.register(registerRequest);
                const registerResponse = (0, class_transformer_1.plainToClass)(auth_response_1.AuthResponse, result);
                res.status(200).json(registerResponse);
            }
            catch (e) {
                next(e);
            }
        });
        this.login = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const loginRequest = (0, class_transformer_1.plainToClass)(auth_request_1.LoginRequest, req.body);
            try {
                const check = yield (0, class_validator_1.validate)(loginRequest);
                if (check.length > 0)
                    throw new error_middleware_1.HttpException(400, check.toString());
                const result = yield this.authService.login(loginRequest);
                const loginResponse = (0, class_transformer_1.plainToClass)(auth_response_1.AuthResponse, result);
                res.status(200).json(loginResponse);
            }
            catch (e) {
                next(e);
            }
        });
        this.logout = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const logoutRequest = (0, class_transformer_1.plainToClass)(auth_request_1.LogoutRequest, req.body);
            try {
                const check = yield (0, class_validator_1.validate)(logoutRequest);
                if (check.length > 0)
                    throw new error_middleware_1.HttpException(400, check.toString());
                const { accessToken, refreshToken } = logoutRequest;
                yield this.authService.logout(accessToken, refreshToken);
                res.status(200).json({ message: 'SUCCESS' });
            }
            catch (e) {
                next(e);
            }
        });
        this.refreshToken = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const accessToken = yield this.authService.refreshToken(req.body.refreshToken);
                res.status(200).json({ accessToken });
            }
            catch (e) {
                next(e);
            }
        });
    }
}
exports.default = AuthController;
