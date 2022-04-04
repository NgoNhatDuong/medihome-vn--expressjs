import { TokenListRequest, UserListRequest } from './admin.request'
import db from '../../config/typeorm.config'
import UserEntity from '../../mysql/entity/user.entity'
import TokenEntity from '../../mysql/entity/token.entity'

export default class AdminService {
    async userList(req: UserListRequest) {
        // const result = await db.getRepository(UserEntity).find({
        //     take: req.limit,
        //     skip: req.limit * req.page,
        //     order: req.order,
        // })
        // return result
    }

    async tokenList(req: TokenListRequest) {
        // const result = await db.getRepository(TokenEntity).find({
        //     take: req.limit,
        //     skip: req.limit * req.page,
        //     order: req.order,
        // })
        // return result
    }
}
