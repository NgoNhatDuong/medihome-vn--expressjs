"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenListRequest = exports.UserListRequest = void 0;
class UserListRequest {
    static fromRequest(request) {
        const ins = new UserListRequest();
        ins.page = Number(request.body._page) || 1;
        ins.limit = Number(request.body._limit) || 10;
        ins.order = request.body._order || {};
        return ins;
    }
}
exports.UserListRequest = UserListRequest;
class TokenListRequest {
    static fromRequest(request) {
        const ins = new TokenListRequest();
        ins.page = Number(request.body._page) || 1;
        ins.limit = Number(request.body._limit) || 10;
        ins.order = request.body._order || {};
        return ins;
    }
}
exports.TokenListRequest = TokenListRequest;
