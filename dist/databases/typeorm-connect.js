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
const Utils_1 = require("../common/Utils");
const config_1 = __importDefault(require("../config"));
class TypeORMConnect {
    connectMySQL() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield (0, typeorm_1.createConnection)({
                    type: 'mysql',
                    host: config_1.default.typeOrm.host,
                    port: config_1.default.typeOrm.port,
                    username: config_1.default.typeOrm.username,
                    password: config_1.default.typeOrm.password,
                    database: config_1.default.typeOrm.database,
                    entities: config_1.default.typeOrm.entities,
                    logging: config_1.default.nodeEnv === 'LOCAL',
                });
                console.log(`${Utils_1.colorLog.magenta}🚀 MySQL listening at: ${config_1.default.typeOrm.host}: ${config_1.default.typeOrm.port} ${Utils_1.colorLog.reset}`);
            }
            catch (error) {
                console.log(Utils_1.colorLog.yellow + Utils_1.colorLog.bgRed + error + Utils_1.colorLog.reset);
            }
        });
    }
}
exports.default = new TypeORMConnect();
