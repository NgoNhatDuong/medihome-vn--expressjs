"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const symbol_info_route_1 = __importDefault(require("./mongodb/symbolInfo/symbol-info.route"));
const error_middleware_1 = require("./middleware/error.middleware");
const admin_route_1 = __importDefault(require("./modules/admin/admin.route"));
const auth_route_1 = __importDefault(require("./modules/auth/auth.route"));
const product_route_1 = __importDefault(require("./modules/product/product.route"));
class Server {
    constructor(port) {
        this.app = (0, express_1.default)();
        this.PORT = port;
    }
    initialize() {
        this.initMiddleware();
        this.initRoutes();
        this.initErrorMiddleware();
    }
    initMiddleware() {
        this.app.use((0, helmet_1.default)());
        this.app.use(express_1.default.json());
    }
    initRoutes() {
        this.app.use('/', new auth_route_1.default().router);
        this.app.use('/', new product_route_1.default().router);
        this.app.use('/', new admin_route_1.default().router);
        this.app.use('/', new symbol_info_route_1.default().router);
    }
    initErrorMiddleware() {
        this.app.use(error_middleware_1.errorMiddleware);
    }
}
exports.default = Server;
