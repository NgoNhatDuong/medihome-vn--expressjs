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
const auth_request_1 = require("./auth.request");
const auth_service_1 = __importDefault(require("./auth.service"));
const auth_response_1 = require("./auth.response");
class AuthController {
    constructor() {
        this.authService = new auth_service_1.default();
        this.register = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { username, password, email, phone } = auth_request_1.RegisterRequest.fromRequest(req);
                const result = yield this.authService.register(username, password, email, phone);
                const registerResponse = auth_response_1.AuthResponse.fromData(result);
                res.status(200).json(registerResponse);
            }
            catch (e) {
                next(e);
            }
        });
        this.login = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { username, password } = auth_request_1.LoginRequest.fromRequest(req);
                const result = yield this.authService.login(username, password);
                const loginResponse = auth_response_1.AuthResponse.fromData(result);
                res.status(200).json(loginResponse);
            }
            catch (e) {
                next(e);
            }
        });
        this.logout = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { accessToken, userId } = auth_request_1.LogoutRequest.fromRequest(req);
                yield this.authService.logout(userId, accessToken);
                res.status(200).json({ message: 'SUCCESS' });
            }
            catch (e) {
                next(e);
            }
        });
        this.kickout = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId, refreshToken } = auth_request_1.KickoutRequest.fromRequest(req);
                yield this.authService.kickout(userId, refreshToken);
                res.status(200).json({ message: 'SUCCESS' });
            }
            catch (e) {
                next(e);
            }
        });
        this.refreshToken = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId, refreshToken } = auth_request_1.RefreshTokenRequest.fromRequest(req);
                const accessToken = yield this.authService.refreshToken(userId, refreshToken);
                res.status(200).json({ accessToken });
            }
            catch (e) {
                next(e);
            }
        });
        this.changePassword = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { username, oldPassword, newPassword } = auth_request_1.ChangePasswordRequest.fromRequest(req);
                const result = yield this.authService.changePassword(username, oldPassword, newPassword);
                const changePasswordResponse = auth_response_1.AuthResponse.fromData(result);
                res.status(200).json(changePasswordResponse);
            }
            catch (e) {
                next(e);
            }
        });
        this.forgotPassword = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { email } = auth_request_1.ForgotPasswordRequest.fromRequest(req);
                yield this.authService.forgotPassword(email);
                res.status(200).json({ message: 'SUCCESS' });
            }
            catch (e) {
                next(e);
            }
        });
        this.resetPassword = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, tokenReset, newPassword } = auth_request_1.ResetPasswordRequest.fromRequest(req);
                const result = yield this.authService.resetPassword(email, tokenReset, newPassword);
                const resetPasswordResponse = auth_response_1.AuthResponse.fromData(result);
                res.status(200).json(resetPasswordResponse);
            }
            catch (e) {
                next(e);
            }
        });
    }
}
exports.default = AuthController;
