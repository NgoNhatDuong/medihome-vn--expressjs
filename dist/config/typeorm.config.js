"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoDBSource = exports.MySqlSource = void 0;
const typeorm_1 = require("typeorm");
const env_config_1 = __importDefault(require("./env.config"));
const MySqlSource = new typeorm_1.DataSource({
    type: 'mysql',
    host: env_config_1.default.mySql.host,
    port: env_config_1.default.mySql.port,
    database: env_config_1.default.mySql.database,
    username: env_config_1.default.mySql.username,
    password: env_config_1.default.mySql.password,
    entities: ['dist/mysql/entity/*.js'],
    synchronize: false,
    logging: true,
});
exports.MySqlSource = MySqlSource;
const MongoDBSource = new typeorm_1.DataSource({
    type: 'mongodb',
    host: env_config_1.default.mongoDB.host,
    port: env_config_1.default.mongoDB.port,
    database: env_config_1.default.mongoDB.database,
    username: env_config_1.default.mongoDB.username,
    password: env_config_1.default.mongoDB.password,
    entities: ['dist/mongodb/entity/*.js'],
    synchronize: false,
    logging: true,
});
exports.MongoDBSource = MongoDBSource;
