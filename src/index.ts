import 'reflect-metadata'

import App from './app'
import Env from './config/env.config'
import MailerConfig from './config/mailer.config'
import MySqlDataSource from './config/typeorm.config'
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
        await MySqlDataSource.initialize()
        Logger.info(`🚀 MySQL listening at:: ${Env.typeOrm.host}`)
        await MailerConfig.initialize()
        Logger.info(`🚀 Email listening at:: ${Env.email.username}`)

        const app = new App()
        app.initialize()
    } catch (error) {
        Logger.error(`Connect faild: ${error.toString()}`)
    }
}

start()
