import { Arg, Mutation, Query, Resolver } from 'type-graphql'
import { SymbolInfoEntity } from '../entity/symbol-info.entity'
import SymbolInfoService from './symbol-info.repo'

@Resolver(_type => SymbolInfoEntity)
export class SymbolInfoResolver {
    @Query(_type => [SymbolInfoEntity])
    public async symbolInfoList(
        @Arg('page', { defaultValue: 1 }) page: number,
        @Arg('limit', { nullable: true, defaultValue: 10 }) limit?: number,
    ): Promise<SymbolInfoEntity[]> {
        return SymbolInfoService.find({ limit, page })
    }
}
