"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthResponse = void 0;
class AuthResponse {
    static fromData(data) {
        var _a, _b, _c;
        const instance = new AuthResponse();
        instance.accessToken = data.accessToken;
        instance.refreshToken = data.refreshToken;
        instance.userInfo = {
            userId: (_a = data.userInfo) === null || _a === void 0 ? void 0 : _a.userId,
            username: (_b = data.userInfo) === null || _b === void 0 ? void 0 : _b.username,
            email: (_c = data.userInfo) === null || _c === void 0 ? void 0 : _c.email,
        };
        return instance;
    }
}
exports.AuthResponse = AuthResponse;
