import * as dotenv from 'dotenv'
import * as path from 'path'

dotenv.config()
if (process.env.NODE_ENV === 'LOCAL') {
    dotenv.config({ path: path.resolve(process.cwd(), '.env.local'), override: true })
}

const Env = {
    nodeEnv: process.env.NODE_ENV,
    server: {
        PORT: Number(process.env.PORT) || 3000,
        HOST: '127.0.0.1',
    },
    mySql: {
        host: process.env.MYSQL_HOST,
        port: Number(process.env.MYSQL_PORT),
        database: process.env.MYSQL_DATABASE,
        username: process.env.MYSQL_USERNAME,
        password: process.env.MYSQL_PASSWORD || '',
    },

    mongoDB: {
        endPoint: process.env.MONGODB_ENDPOINT,
        host: process.env.MONGODB_HOST,
        port: Number(process.env.MONGODB_PORT),
        database: process.env.MONGODB_DATABASE,
        username: process.env.MONGODB_USERNAME,
        password: process.env.MONGODB_PASSWORD || '',
    },

    email: {
        service: process.env.EMAIL_SERVICE,
        username: process.env.EMAIL_USERNAME,
        password: process.env.EMAIL_PASSWORD,
    },
    jwt: {
        accessKey: process.env.JWT_ACCESS_KEY,
        refreshKey: process.env.JWT_REFRESH_KEY,
        accessTime: Number(process.env.JWT_ACCESS_TIME),
        refreshTime: Number(process.env.JWT_REFRESH_TIME),
    },
}

export default Env
