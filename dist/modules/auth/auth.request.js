"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RefreshTokenRequest = exports.LogoutRequest = exports.LoginRequest = exports.RegisterRequest = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
let RegisterRequest = class RegisterRequest {
};
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], RegisterRequest.prototype, "username", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.MinLength)(6, { message: 'Password is too short' }),
    __metadata("design:type", String)
], RegisterRequest.prototype, "password", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsEmail)({ message: 'Email is invalid' }),
    __metadata("design:type", String)
], RegisterRequest.prototype, "email", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.Length)(10, 10, { message: 'Phone number requires 10 characters' }),
    __metadata("design:type", String)
], RegisterRequest.prototype, "phone", void 0);
RegisterRequest = __decorate([
    (0, class_transformer_1.Exclude)()
], RegisterRequest);
exports.RegisterRequest = RegisterRequest;
class LoginRequest {
}
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], LoginRequest.prototype, "username", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.MinLength)(6, { message: 'Password is too short' }),
    __metadata("design:type", String)
], LoginRequest.prototype, "password", void 0);
exports.LoginRequest = LoginRequest;
let LogoutRequest = class LogoutRequest {
};
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], LogoutRequest.prototype, "accessToken", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.ValidateIf)(o => o.refreshToken !== undefined),
    (0, class_validator_1.IsArray)({ message: 'RefreshToken is array' }),
    __metadata("design:type", Array)
], LogoutRequest.prototype, "refreshToken", void 0);
LogoutRequest = __decorate([
    (0, class_transformer_1.Exclude)()
], LogoutRequest);
exports.LogoutRequest = LogoutRequest;
let RefreshTokenRequest = class RefreshTokenRequest {
};
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], RefreshTokenRequest.prototype, "refreshToken", void 0);
RefreshTokenRequest = __decorate([
    (0, class_transformer_1.Exclude)()
], RefreshTokenRequest);
exports.RefreshTokenRequest = RefreshTokenRequest;
