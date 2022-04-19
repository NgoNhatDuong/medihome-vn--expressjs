import { DataSource } from 'typeorm'
import Env from './env.config'

const MySqlSource = new DataSource({
    type: 'mysql',
    host: Env.mySql.host,
    port: Env.mySql.port,
    database: Env.mySql.database,
    username: Env.mySql.username,
    password: Env.mySql.password,
    entities: ['dist/mysql/entity/*.js'],
    synchronize: false,
    logging: true,
})

const MongoDBSource = new DataSource({
    type: 'mongodb',
    host: Env.mongoDB.host,
    port: Env.mongoDB.port,
    database: Env.mongoDB.database,
    username: Env.mongoDB.username,
    password: Env.mongoDB.password,
    entities: ['dist/mongodb/entity/*.js'],
    synchronize: false,
    logging: true,
})

export { MySqlSource, MongoDBSource }
