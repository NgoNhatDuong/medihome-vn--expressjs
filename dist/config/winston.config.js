"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = require("winston");
const logger_utils_1 = __importDefault(require("../utils/logger.utils"));
require("winston-daily-rotate-file");
const customPrint = {
    basic: (info) => `[${info.timestamp}] [${info.level}]: ${info.message}`,
    color: (info) => `${logger_utils_1.default.colorize[info.level]}[${info.timestamp}] [${info.level.toUpperCase()}]:` +
        `${logger_utils_1.default.colorize.reset} ${info.message}`,
};
const WinstonLogger = (0, winston_1.createLogger)({
    format: winston_1.format.combine(winston_1.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), winston_1.format.errors({ stack: true }), winston_1.format.printf(customPrint.basic)),
    transports: [
        new winston_1.transports.Console({
            format: winston_1.format.combine(winston_1.format.printf(customPrint.color)),
        }),
        new winston_1.transports.DailyRotateFile({
            filename: 'logs-winston/%DATE%.log',
            datePattern: 'YYYY-MM-DD',
            zippedArchive: true,
            maxSize: '500k',
            maxFiles: '180d',
            auditFile: 'logs-winston/winston-audit.json',
        }),
    ],
});
exports.default = WinstonLogger;
