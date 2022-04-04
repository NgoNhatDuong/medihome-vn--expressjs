import { EntityRepository, Repository } from 'typeorm'
import TokenEntity from '../entity/token.entity'

@EntityRepository(TokenEntity)
export default class TokenRepository extends Repository<TokenEntity> {}
