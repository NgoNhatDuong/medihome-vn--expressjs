import { createLogger, format, transports } from 'winston'
import { colorLog as cLog } from './Utils'
import 'winston-daily-rotate-file'

const { combine, timestamp, splat, simple, printf, colorize } = format

const Logger = createLogger({
	format: combine(
		timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
		splat(),
		simple(),
		printf(info => `[${info.timestamp}] [${info.level}]: ${info.message}`),
	),
	transports: [
		new transports.Console({
			format: combine(
				printf(
					info =>
						`${cLog.blue}[${info.timestamp}]${cLog.reset} ` +
						`[${info.level.toUpperCase()}]: ` +
						`${info.message}`,
				),
			),
		}),
		new transports.DailyRotateFile({
			filename: 'logs/%DATE%.log',
			datePattern: 'YYYY-MM-DD',
			zippedArchive: true,
			maxSize: '1m',
			maxFiles: '14d',
			auditFile: 'logs/winston-audit.json',
		}),
	],
})

export default Logger
