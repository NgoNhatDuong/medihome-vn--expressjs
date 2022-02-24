"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = require("winston");
const Utils_1 = require("./Utils");
require("winston-daily-rotate-file");
const { combine, timestamp, splat, simple, printf, colorize } = winston_1.format;
const Logger = (0, winston_1.createLogger)({
    format: combine(timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), splat(), simple(), printf(info => `[${info.timestamp}] [${info.level}]: ${info.message}`)),
    transports: [
        new winston_1.transports.Console({
            format: combine(printf(info => `${Utils_1.colorLog.blue}[${info.timestamp}]${Utils_1.colorLog.reset} ` +
                `[${info.level.toUpperCase()}]: ` +
                `${info.message}`)),
        }),
        new winston_1.transports.DailyRotateFile({
            filename: 'logs/%DATE%.log',
            datePattern: 'YYYY-MM-DD',
            zippedArchive: true,
            maxSize: '1m',
            maxFiles: '14d',
            auditFile: 'logs/winston-audit.json',
        }),
    ],
});
exports.default = Logger;
