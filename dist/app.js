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
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const Logger_1 = __importDefault(require("./common/Logger"));
const Utils_1 = require("./common/Utils");
const config_1 = __importDefault(require("./config"));
const typeorm_connect_1 = __importDefault(require("./databases/typeorm-connect"));
const error_middleware_1 = require("./middleware/error.middleware");
const admin_route_1 = __importDefault(require("./modules/admin/admin.route"));
const auth_route_1 = __importDefault(require("./modules/auth/auth.route"));
const product_route_1 = __importDefault(require("./modules/product/product.route"));
class App {
    constructor() {
        this.app = (0, express_1.default)();
        this.PORT = config_1.default.server.PORT;
        this.init();
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            yield typeorm_connect_1.default.connectMySQL();
            this.initializeMiddleware();
            this.initializeRoutes();
            this.initializeErrorMiddleware();
            this.listen();
        });
    }
    initializeMiddleware() {
        this.app.use((0, helmet_1.default)());
        this.app.use(express_1.default.json());
        this.app.use((req, res, next) => {
            Logger_1.default.request(req);
            next();
        });
    }
    initializeRoutes() {
        this.app.use('/', new auth_route_1.default().router);
        this.app.use('/', new product_route_1.default().router);
        this.app.use('/', new admin_route_1.default().router);
    }
    initializeErrorMiddleware() {
        this.app.use(error_middleware_1.errorMiddleware);
    }
    listen() {
        this.app.listen(this.PORT, () => {
            console.log(`${Utils_1.colorLog.magenta}🚀 Server listening at: http://localhost:${this.PORT} ${Utils_1.colorLog.reset}`);
        });
    }
}
exports.default = App;
