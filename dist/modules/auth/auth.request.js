"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResetPasswordRequest = exports.ChangePasswordRequest = exports.ForgotPasswordRequest = exports.RefreshTokenRequest = exports.KickoutRequest = exports.LogoutRequest = exports.LoginRequest = exports.RegisterRequest = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_config_1 = __importDefault(require("../../config/env.config"));
const validate_utils_1 = __importDefault(require("../../utils/validate.utils"));
const error_utils_1 = __importDefault(require("../../utils/error.utils"));
class RegisterRequest {
    validate() {
        const message = [];
        if (!validate_utils_1.default.isUsername(this.username))
            message.push('Username is invalid');
        if (!validate_utils_1.default.isGmail(this.email))
            message.push('Email must format: *****@gmail.com');
        if (!validate_utils_1.default.isPhone(this.phone))
            message.push('Phone number must be actual');
        if (!validate_utils_1.default.isPassword(this.password))
            message.push('Password is invalid');
        if (message.length > 0) {
            throw new error_utils_1.default(409, 'VALIDATE_FAIL', message.join('.'));
        }
    }
    static fromRequest(request) {
        const ins = new RegisterRequest();
        ins.username = request.body.username;
        ins.password = request.body.password;
        ins.email = request.body.email;
        ins.phone = request.body.phone;
        ins.validate();
        return ins;
    }
}
exports.RegisterRequest = RegisterRequest;
class LoginRequest {
    validate() {
        if (!validate_utils_1.default.isPassword(this.password))
            throw new error_utils_1.default(409, 'VALIDATE_FAIL', 'Password is invalid !');
    }
    static fromRequest(request) {
        const ins = new LoginRequest();
        ins.username = request.body.username;
        ins.password = request.body.password;
        ins.validate();
        return ins;
    }
}
exports.LoginRequest = LoginRequest;
class LogoutRequest {
    validate() {
        try {
            const decoded = jsonwebtoken_1.default.verify(this.accessToken, env_config_1.default.jwt.accessKey);
            this.userId = decoded.userId;
        }
        catch (e) {
            throw new error_utils_1.default(401, 'TOKEN_VALID', 'Token is invalid');
        }
    }
    static fromRequest(request) {
        const ins = new LogoutRequest();
        ins.accessToken = request.body.accessToken;
        ins.validate();
        return ins;
    }
}
exports.LogoutRequest = LogoutRequest;
class KickoutRequest {
    validate() {
        try {
            const decoded = jsonwebtoken_1.default.verify(this.accessToken, env_config_1.default.jwt.accessKey);
            this.userId = decoded.userId;
        }
        catch (e) {
            throw new error_utils_1.default(401, 'TOKEN_VALID', 'Token is invalid');
        }
    }
    static fromRequest(request) {
        const ins = new KickoutRequest();
        ins.accessToken = request.body.accessToken;
        ins.refreshToken = request.body.refreshToken || [];
        ins.validate();
        return ins;
    }
}
exports.KickoutRequest = KickoutRequest;
class RefreshTokenRequest {
    validate() {
        try {
            const decoded = jsonwebtoken_1.default.verify(this.refreshToken, env_config_1.default.jwt.refreshKey);
            this.userId = decoded.userId;
        }
        catch (e) {
            throw new error_utils_1.default(401, 'TOKEN_VALID', 'Token is invalid');
        }
    }
    static fromRequest(request) {
        const ins = new RefreshTokenRequest();
        ins.refreshToken = request.body.refreshToken;
        ins.validate();
        return ins;
    }
}
exports.RefreshTokenRequest = RefreshTokenRequest;
class ForgotPasswordRequest {
    validate() {
        if (!validate_utils_1.default.isGmail(this.email))
            throw new error_utils_1.default(401, 'VALIDATE_FAIL', 'Email must format: *****@gmail.com !');
    }
    static fromRequest(request) {
        const ins = new ForgotPasswordRequest();
        ins.email = request.body.email;
        ins.validate();
        return ins;
    }
}
exports.ForgotPasswordRequest = ForgotPasswordRequest;
class ChangePasswordRequest {
    validate() {
        if (!validate_utils_1.default.isPassword(this.oldPassword))
            throw new error_utils_1.default(409, 'VALIDATE_FAIL', 'Password is invalid !');
        if (!validate_utils_1.default.isPassword(this.newPassword))
            throw new error_utils_1.default(409, 'VALIDATE_FAIL', 'Password is invalid !');
    }
    static fromRequest(request) {
        const ins = new ChangePasswordRequest();
        ins.username = request.body.username;
        ins.oldPassword = request.body.oldPassword;
        ins.newPassword = request.body.newPassword;
        ins.validate();
        return ins;
    }
}
exports.ChangePasswordRequest = ChangePasswordRequest;
class ResetPasswordRequest {
    validate() {
        if (!validate_utils_1.default.isPassword(this.newPassword))
            throw new error_utils_1.default(409, 'VALIDATE_FAIL', 'Password is invalid !');
    }
    static fromRequest(request) {
        const ins = new ResetPasswordRequest();
        ins.email = request.body.email;
        ins.tokenReset = request.body.tokenReset;
        ins.newPassword = request.body.newPassword;
        ins.validate();
        return ins;
    }
}
exports.ResetPasswordRequest = ResetPasswordRequest;
