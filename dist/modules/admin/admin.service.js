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
const typeorm_1 = require("typeorm");
const token_repository_1 = __importDefault(require("../../databases/repository/token.repository"));
const user_repository_1 = __importDefault(require("../../databases/repository/user.repository"));
class AdminService {
    constructor() {
        this.userRepository = (0, typeorm_1.getCustomRepository)(user_repository_1.default);
        this.tokenRepository = (0, typeorm_1.getCustomRepository)(token_repository_1.default);
    }
    userList(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.userRepository.find(Object.assign({ take: req._limit, skip: req._limit * req._page }, (req._sort ? { order: { [req._sort]: req._order || 'ASC' } } : {})));
            return result;
        });
    }
    tokenList(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.tokenRepository.find(Object.assign({ take: req._limit, skip: req._limit * req._page }, (req._sort ? { order: { [req._sort]: req._order || 'ASC' } } : {})));
            return result;
        });
    }
}
exports.default = AdminService;
