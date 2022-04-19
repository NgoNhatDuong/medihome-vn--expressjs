import 'reflect-metadata'

import Server from './server'
import Env from './config/env.config'
import MailerConfig from './config/mailer.config'
import { MySqlSource, MongoDBSource } from './config/typeorm.config'
import ErrorUtils from './utils/error.utils'
import Logger from './utils/logger.utils'

Logger.config({
    folder: 'logs',
    filePattern: 'YYYY-MM/YYYY-MM-DD',
    timePattern: 'YYYY-DD-MM hh:mm:ss',
    hasConsole: true,
    hasFile: true,
})

const start = async () => {
    try {
        await MySqlSource.initialize()
        Logger.info(`🚀 MySQL listening at: ${Env.mySql.host}`)
    } catch (error) {
        Logger.error(new ErrorUtils(500, 'MYSQL_CONNECT_FAIL', error.message))
    }
    try {
        await MongoDBSource.initialize()
        Logger.info(`🚀 MongoDB listening at: ${Env.mongoDB.endPoint}`)
    } catch (error) {
        Logger.error(new ErrorUtils(500, 'MONGODB_CONNECT_FAIL', error.message))
    }
    try {
        await MailerConfig.initialize()
        Logger.info(`🚀 Email listening at: ${Env.email.username}`)
    } catch (error) {
        Logger.error(new ErrorUtils(500, 'EMAIL_CONNECT_FAIL', error.message))
    }

    const server = new Server(Env.server.PORT)
    server.initialize()
    server.app.listen(Env.server.PORT, () => {
        Logger.info(`🚀 Server listening at: http://${Env.server.HOST}:${Env.server.PORT}`)
    })
}

start()
