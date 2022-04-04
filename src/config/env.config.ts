import * as dotenv from 'dotenv'
import * as path from 'path'

dotenv.config({ path: path.resolve(process.cwd(), '.env.prod') })
dotenv.config({ path: path.resolve(process.cwd(), '.env.local'), override: true })

const Env = {
    nodeEnv: 'LOCAL',
    server: {
        PORT: Number(process.env.PORT) || 3000,
    },
    typeOrm: {
        type: 'mysql',
        host: process.env.MYSQL_HOST,
        port: Number(process.env.MYSQL_PORT),
        database: process.env.MYSQL_DATABASE,
        username: process.env.MYSQL_USERNAME,
        password: process.env.MYSQL_PASSWORD || '',
        entities: ['dist/mysql/entity/*.js'],
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
