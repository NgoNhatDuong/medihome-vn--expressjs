"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const product = {
    nodeEnv: 'PRODUCT',
    server: {
        PORT: Number(process.env.PORT) || 3000,
    },
    typeOrm: {
        type: 'mysql',
        host: process.env.MYSQL_HOST,
        port: Number(process.env.MYSQL_PORT),
        database: process.env.MYSQL_DATABASE,
        username: process.env.MYSQL_USERNAME,
        password: process.env.MYSQL_PASSWORD,
        entities: [`${__dirname}/databases/entity/*.js`],
    },
    jwt: {
        accessKey: process.env.JWT_ACCESS_KEY,
        refreshKey: process.env.JWT_REFRESH_KEY,
        accessTime: Number(process.env.JWT_ACCESS_TIME),
        refreshTime: Number(process.env.JWT_REFRESH_TIME),
    },
};
const local = {
    nodeEnv: 'LOCAL',
    server: {
        PORT: 3000,
    },
    typeOrm: {
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        database: 'medihome',
        username: 'root',
        password: '',
        entities: [`${__dirname}/databases/entity/*.js`],
    },
    jwt: {
        accessKey: '123456789',
        accessTime: 60 * 60,
        refreshKey: 'ABC123xyz@#8$',
        refreshTime: 24 * 7 * 60 * 60,
    },
};
const config = process.env.NODE_ENV === 'LOCAL' ? local : product;
exports.default = config;
