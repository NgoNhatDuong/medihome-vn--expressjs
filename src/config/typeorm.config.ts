import { DataSource } from 'typeorm'
import Env from './env.config'

const { host, port, username, password, database, entities } = Env.typeOrm

const MySqlDataSource = new DataSource({
    type: 'mysql',
    host,
    port,
    username,
    password,
    database,
    entities,
    synchronize: false,
    logging: true,
})

export default MySqlDataSource
