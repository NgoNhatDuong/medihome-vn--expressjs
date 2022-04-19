import { createLogger, format, transports } from 'winston'
import Logger from '../utils/logger.utils'
import 'winston-daily-rotate-file'

const customPrint = {
    basic: (info: any) => `[${info.timestamp}] [${info.level}]: ${info.message}`,
    color: (info: any) =>
        `${Logger.colorize[info.level]}[${info.timestamp}] [${info.level.toUpperCase()}]:` +
        `${Logger.colorize.reset} ${info.message}`,
}

const WinstonLogger = createLogger({
    format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        format.errors({ stack: true }),
        format.printf(customPrint.basic),
    ),
    transports: [
        new transports.Console({
            format: format.combine(format.printf(customPrint.color)),
        }),
        new transports.DailyRotateFile({
            filename: 'logs-winston/%DATE%.log',
            datePattern: 'YYYY-MM-DD',
            zippedArchive: true,
            maxSize: '500k',
            maxFiles: '180d',
            auditFile: 'logs-winston/winston-audit.json',
        }),
    ],
})

export default WinstonLogger
