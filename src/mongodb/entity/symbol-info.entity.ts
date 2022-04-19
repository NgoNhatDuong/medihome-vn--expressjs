import { Column, Entity, PrimaryColumn } from 'typeorm'
import { Field, ObjectType } from 'type-graphql'

@ObjectType('SymbolInfoType')
@Entity('c_symbol_info')
export class SymbolInfoEntity {
    @Field(() => String)
    @PrimaryColumn()
    _id: string

    @Field(() => String)
    @Column()
    m: string

    @Field(() => String)
    @Column()
    n1: string

    @Field(() => String)
    @Column()
    n2: string

    @Field(() => Number)
    @Column()
    t: string

    @Field(() => Number)
    @Column()
    o: number

    @Field(() => Number)
    @Column()
    h: number

    @Field(() => Number)
    @Column()
    l: number

    @Field(() => Number)
    @Column()
    c: number

    @Field(() => Number)
    @Column()
    ch: number
}
