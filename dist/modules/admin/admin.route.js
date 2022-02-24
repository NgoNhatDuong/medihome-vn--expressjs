"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const admin_controller_1 = __importDefault(require("./admin.controller"));
class AdminRoute {
    constructor() {
        this.router = (0, express_1.Router)();
        this.adminController = new admin_controller_1.default();
        this.initializeRoute();
    }
    initializeRoute() {
        this.router.get('/admin/user-list', this.adminController.userList);
        this.router.get('/admin/token-list', this.adminController.tokenList);
    }
}
exports.default = AdminRoute;
