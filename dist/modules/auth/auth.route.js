"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = __importDefault(require("./auth.controller"));
class AuthRoute {
    constructor() {
        this.router = (0, express_1.Router)();
        this.authController = new auth_controller_1.default();
        this.initializeRoute();
    }
    initializeRoute() {
        this.router.post('/auth/register', this.authController.register);
        this.router.post('/auth/login', this.authController.login);
        this.router.post('/auth/logout', this.authController.logout);
        this.router.post('/auth/kickout', this.authController.kickout);
        this.router.post('/auth/refresh-token', this.authController.refreshToken);
        this.router.post('/auth/change-password', this.authController.changePassword);
        this.router.get('/auth/forgot-password', this.authController.forgotPassword);
        this.router.post('/auth/reset-password', this.authController.resetPassword);
    }
}
exports.default = AuthRoute;
