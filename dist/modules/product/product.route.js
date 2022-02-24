"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const product_controller_1 = __importDefault(require("./product.controller"));
class ProductRoute {
    constructor() {
        this.router = (0, express_1.Router)();
        this.productController = new product_controller_1.default();
        this.initializeRoute();
    }
    initializeRoute() {
        this.router.post('/api/v1/product/list', this.productController.list);
        this.router.post('/api/v1/product/trash', this.productController.list);
        this.router.post('/api/v1/product/add', this.productController.add);
        this.router.post('/api/v1/product/details/:id', this.productController.details);
        this.router.post('/api/v1/product/update/:id', this.productController.update);
        this.router.post('/api/v1/product/remove/:id', this.productController.update);
        this.router.post('/api/v1/product/restore/:id', this.productController.update);
        this.router.post('/api/v1/product/destroy/:id', this.productController.update);
    }
}
exports.default = ProductRoute;
