import { createConnection } from 'typeorm'
import { colorLog } from '../common/Utils'
import config from '../config'
import UserEntity from './entity/user.entity'

class TypeORMConnect {
	public async connectMySQL() {
		try {
			await createConnection({
				type: 'mysql',
				host: config.typeOrm.host,
				port: config.typeOrm.port,
				username: config.typeOrm.username,
				password: config.typeOrm.password,
				database: config.typeOrm.database,
				entities: config.typeOrm.entities,
				// synchronize: true,
				logging: config.nodeEnv === 'LOCAL',
			})
			console.log(
				`${colorLog.magenta}🚀 MySQL listening at: ${config.typeOrm.host}: ${config.typeOrm.port} ${colorLog.reset}`,
			)
		} catch (error) {
			console.log(colorLog.yellow + colorLog.bgRed + error + colorLog.reset)
		}
	}
}

export default new TypeORMConnect()
