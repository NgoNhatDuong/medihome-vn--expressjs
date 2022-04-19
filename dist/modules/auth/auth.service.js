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
const env_config_1 = __importDefault(require("../../config/env.config"));
const mailer_config_1 = __importDefault(require("../../config/mailer.config"));
const token_entity_1 = __importDefault(require("../../mysql/entity/token.entity"));
const user_entity_1 = __importDefault(require("../../mysql/entity/user.entity"));
const string_utils_1 = __importDefault(require("../../utils/string.utils"));
const typeorm_config_1 = require("../../config/typeorm.config");
const error_utils_1 = __importDefault(require("../../utils/error.utils"));
class AuthService {
    generateToken(manager, user) {
        return __awaiter(this, void 0, void 0, function* () {
            const accessToken = jsonwebtoken_1.default.sign({ userId: user.userId }, env_config_1.default.jwt.accessKey, {
                expiresIn: env_config_1.default.jwt.accessTime,
            });
            const refreshToken = jsonwebtoken_1.default.sign({ userId: user.userId }, env_config_1.default.jwt.refreshKey, {
                expiresIn: env_config_1.default.jwt.refreshTime,
            });
            const createToken = manager.create(token_entity_1.default, {
                userId: user.userId,
                accessToken,
                refreshToken,
                expiresIn: new Date(new Date().getTime() + env_config_1.default.jwt.refreshTime * 1000),
                status: 'active',
            });
            const token = yield manager.save(createToken);
            return token;
        });
    }
    register(username, password, email, phone) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield typeorm_config_1.MySqlSource.manager.transaction((manager) => __awaiter(this, void 0, void 0, function* () {
                const findUser = yield manager.findOne(user_entity_1.default, {
                    where: [{ username }, { email }],
                });
                if (findUser)
                    throw new error_utils_1.default(401, 'ACCOUNT_EXIST', 'Username or Email is already exist');
                const hashPassword = yield bcrypt_1.default.hash(password, 5);
                const createUser = manager.create(user_entity_1.default, {
                    username,
                    email,
                    phone,
                    password: hashPassword,
                });
                const user = yield manager.save(createUser);
                const token = yield this.generateToken(manager, user);
                return {
                    userInfo: user,
                    accessToken: token.accessToken,
                    refreshToken: token.refreshToken,
                };
            }));
            return response;
        });
    }
    login(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield typeorm_config_1.MySqlSource.manager.findOneBy(user_entity_1.default, { username });
            if (!user)
                throw new error_utils_1.default(404, 'ACCOUNT_EXIST', 'Username is already exist');
            const checkPassword = yield bcrypt_1.default.compare(password, user.password);
            if (!checkPassword)
                throw new error_utils_1.default(404, 'ACCOUNT_EXIST', 'Password is incorrect');
            const token = yield this.generateToken(typeorm_config_1.MySqlSource.manager, user);
            return {
                accessToken: token.accessToken,
                refreshToken: token.refreshToken,
                userInfo: user,
            };
        });
    }
    logout(userId, accessToken) {
        return __awaiter(this, void 0, void 0, function* () {
            yield typeorm_config_1.MySqlSource.manager.update(token_entity_1.default, {
                userId,
                accessToken,
                status: 'active',
            }, { status: 'deactive' });
        });
    }
    kickout(userId, refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            let conditions = {};
            if (refreshToken.length > 0) {
                conditions = { refreshToken: (0, typeorm_1.In)(refreshToken) };
            }
            yield typeorm_config_1.MySqlSource.manager.update(token_entity_1.default, Object.assign(Object.assign({ userId }, conditions), { status: 'active' }), { status: 'deactive' });
        });
    }
    refreshToken(userId, refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            const findToken = yield typeorm_config_1.MySqlSource.manager.findOneBy(token_entity_1.default, {
                refreshToken,
                status: 'active',
            });
            if (!findToken)
                throw new error_utils_1.default(404, 'TOKEN_INVALID', 'Token is deactive');
            findToken.accessToken = jsonwebtoken_1.default.sign({ userId }, env_config_1.default.jwt.accessKey, {
                expiresIn: env_config_1.default.jwt.accessTime,
            });
            const token = yield typeorm_config_1.MySqlSource.manager.save(findToken);
            return token.accessToken;
        });
    }
    changePassword(username, oldPassword, newPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield typeorm_config_1.MySqlSource.manager.findOneBy(user_entity_1.default, { username });
            if (!user)
                throw new error_utils_1.default(404, 'ACCOUNT_INVALID', 'Username is not exist');
            const checkPassword = yield bcrypt_1.default.compare(oldPassword, user.password);
            if (!checkPassword)
                throw new error_utils_1.default(404, 'ACCOUNT_INVALID', 'Password is incorrect');
            user.password = yield bcrypt_1.default.hash(newPassword, 5);
            yield typeorm_config_1.MySqlSource.manager.save(user);
            yield this.kickout(user.userId, []);
            const token = yield this.generateToken(typeorm_config_1.MySqlSource.manager, user);
            return {
                userInfo: user,
                accessToken: token.accessToken,
                refreshToken: token.refreshToken,
            };
        });
    }
    forgotPassword(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield typeorm_config_1.MySqlSource.manager.findOneBy(user_entity_1.default, { email });
            if (!user)
                throw new error_utils_1.default(404, 'ACCOUNT_INVALID', 'Email is not exist');
            const randomString = string_utils_1.default.randomString(10);
            const encriptString = string_utils_1.default.encript(randomString, user.username);
            const expiresIn = new Date(new Date().getTime() + 60 * 60 * 1000);
            const ftoken = typeorm_config_1.MySqlSource.manager.create(token_entity_1.default, {
                userId: user.userId,
                forgotToken: encriptString,
                expiresIn,
                status: 'forgot',
            });
            yield typeorm_config_1.MySqlSource.manager.save(ftoken);
            yield mailer_config_1.default.transporter.sendMail({
                from: env_config_1.default.email.username,
                to: email,
                subject: 'Medihome - Reset Password',
                html: ` <p>Your username: ${user.username}</p>
                    <a href="https://medihome.vn/reset-password?email=${email}&token=${randomString}">
                        Click here to reset Password !!!
                    </a>
                    `,
            });
        });
    }
    resetPassword(email, tokenReset, newPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield typeorm_config_1.MySqlSource.manager.findOneBy(user_entity_1.default, { email });
            if (!user)
                throw new error_utils_1.default(404, 'ACCOUNT_INVALID', 'Email is not exist');
            const encriptString = string_utils_1.default.encript(tokenReset, user.username);
            const ftoken = yield typeorm_config_1.MySqlSource.manager.findOneBy(token_entity_1.default, {
                userId: user.userId,
                forgotToken: encriptString,
                status: 'forgot',
            });
            if (!ftoken)
                throw new error_utils_1.default(404, 'TOKEN_INVALID', 'Token is invalid');
            if (ftoken.expiresIn.getTime() < new Date().getTime()) {
                throw new error_utils_1.default(404, 'TOKEN_INVALID', 'Token has expired');
            }
            user.password = yield bcrypt_1.default.hash(newPassword, 5);
            ftoken.status = 'deactive';
            yield typeorm_config_1.MySqlSource.manager.save([user, ftoken]);
            yield this.kickout(user.userId, []);
            const token = yield this.generateToken(typeorm_config_1.MySqlSource.manager, user);
            return {
                userInfo: user,
                accessToken: token.accessToken,
                refreshToken: token.refreshToken,
            };
        });
    }
}
exports.default = AuthService;
