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
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const typeorm_1 = require("typeorm");
const token_repository_1 = __importDefault(require("../../databases/repository/token.repository"));
const user_entity_1 = __importDefault(require("../../databases/entity/user.entity"));
const error_middleware_1 = require("../../middleware/error.middleware");
const config_1 = __importDefault(require("../../config"));
const token_entity_1 = __importDefault(require("../../databases/entity/token.entity"));
class AuthService {
    constructor() {
        this.tokenRepository = (0, typeorm_1.getCustomRepository)(token_repository_1.default);
        this.entityManager = (0, typeorm_1.getManager)();
    }
    register(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield (0, typeorm_1.getManager)().transaction((entityManager) => __awaiter(this, void 0, void 0, function* () {
                const findUser = yield entityManager.findOne(user_entity_1.default, { username: req.username });
                if (findUser)
                    throw new error_middleware_1.HttpException(401, 'Username is already exist');
                const hashPassword = yield bcrypt_1.default.hash(req.password, 5);
                const createUser = entityManager.create(user_entity_1.default, {
                    username: req.username,
                    password: hashPassword,
                    email: req.email,
                    phone: req.phone,
                });
                const user = yield entityManager.save(createUser);
                const token = yield this.generateToken(entityManager, user);
                return {
                    userInfo: user,
                    accessToken: token.accessToken,
                    refreshToken: token.refreshToken,
                };
            }));
            return response;
        });
    }
    login({ username, password }) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.entityManager.findOne(user_entity_1.default, { username });
            if (!user)
                throw new error_middleware_1.HttpException(404, 'Username is not exist');
            const checkPassword = yield bcrypt_1.default.compare(password, user.password);
            if (!checkPassword)
                throw new error_middleware_1.HttpException(404, 'Password is incorrect');
            const token = yield this.generateToken(this.entityManager, user);
            return {
                accessToken: token.accessToken,
                refreshToken: token.refreshToken,
                userInfo: user,
            };
        });
    }
    logout(accessToken, refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            let decoded;
            try {
                decoded = jsonwebtoken_1.default.verify(accessToken, config_1.default.jwt.accessKey);
            }
            catch (e) {
                throw new error_middleware_1.HttpException(401, 'Token is invalid');
            }
            let conditions = {};
            if (!refreshToken) {
                conditions = { accessToken };
            }
            else if (refreshToken.length === 0) {
                conditions = {};
            }
            else if (refreshToken.length > 0) {
                conditions = { refreshToken: (0, typeorm_1.In)(refreshToken) };
            }
            yield this.entityManager.update(token_entity_1.default, Object.assign(Object.assign({ userId: decoded.userId }, conditions), { status: 'active' }), { status: 'deactive' });
        });
    }
    refreshToken(refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            let decoded;
            try {
                decoded = jsonwebtoken_1.default.verify(refreshToken, config_1.default.jwt.refreshKey);
            }
            catch (e) {
                throw new error_middleware_1.HttpException(401, 'Token is invalid');
            }
            const findToken = yield this.entityManager.findOne(token_entity_1.default, {
                refreshToken,
                status: 'active',
            });
            if (!findToken)
                throw new error_middleware_1.HttpException(404, 'Token is deactive');
            findToken.accessToken = jsonwebtoken_1.default.sign({ userId: decoded.userId }, config_1.default.jwt.accessKey, {
                expiresIn: config_1.default.jwt.accessTime,
            });
            const token = yield this.entityManager.save(findToken);
            return token.accessToken;
        });
    }
    generateToken(entityManager, user) {
        return __awaiter(this, void 0, void 0, function* () {
            const accessToken = jsonwebtoken_1.default.sign({ userId: user.userId }, config_1.default.jwt.accessKey, {
                expiresIn: config_1.default.jwt.accessTime,
            });
            const refreshToken = jsonwebtoken_1.default.sign({ userId: user.userId }, config_1.default.jwt.refreshKey, {
                expiresIn: config_1.default.jwt.refreshTime,
            });
            const createToken = entityManager.create(token_entity_1.default, {
                user,
                accessToken,
                refreshToken,
                expiresIn: new Date(new Date().getTime() + config_1.default.jwt.refreshTime * 1000),
                status: 'active',
            });
            const token = yield entityManager.save(createToken);
            return token;
        });
    }
}
exports.default = AuthService;
