import { MongoDBSource } from '../../config/typeorm.config'
import { SymbolInfoEntity } from '../entity/symbol-info.entity'

export default class SymbolInfoService {
    public static async find(options: { page: number; limit: number }) {
        const result = await MongoDBSource.manager.find(SymbolInfoEntity, {
            take: options.limit,
            skip: options.limit * options.page,
        })
        return result
    }
}
