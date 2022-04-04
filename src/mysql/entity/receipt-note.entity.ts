import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    VersionColumn,
} from 'typeorm'
import { ProviderEntity } from './provider.entity'
import { StockInEntity } from './stock-in.entity'
import UserEntity from './user.entity'

@Entity('receipt_note')
export class ReceiptNoteEntity {
    // id
    @PrimaryGeneratedColumn({ name: 'id' })
    public receiptNoteId: number

    @Column({ name: 'organize_id' })
    public organizeId: number

    // tương ứng: n phiếu nhập <----> 1 nhà cung cấp
    @Column({ name: 'provider_id' })
    public providerId: number

    @ManyToOne(() => ProviderEntity, provider => provider.receiptNoteList)
    @JoinColumn({ name: 'provider_id' })
    public provider: ProviderEntity

    // tương ứng: n phiếu nhập <----> 1 nhân viên nhập thuốc
    @Column({ name: 'user_id' })
    public userId: number

    @ManyToOne(() => UserEntity, user => user.receiptNoteList)
    @JoinColumn({ name: 'user_id' })
    public user: UserEntity

    // tương ứng: 1 phiếu nhập <----> n stockIn
    @OneToMany(() => StockInEntity, stockIn => stockIn.receiptNote)
    stockInList: StockInEntity[]

    // khu vực tiền
    @Column({ name: 'buyer_pays_ship' })
    public buyerPaysShip: number

    @Column({ name: 'seller_pays_ship' })
    public sellerPaysShip: number

    @Column()
    public discount: number // tiền giảm giá

    @Column()
    public debt: number // tiền nợ

    @Column()
    public totalMoney: number // tổng tiền = tiền sản phẩm + buyerPaysShip - tiền giảm giá

    // khu vực trace
    @Column({ name: 'created_by' })
    public createdBy: number

    @Column({ name: 'updated_by' })
    public updatedBy: number

    @CreateDateColumn({ name: 'created_at' })
    public createdAt: Date

    @UpdateDateColumn({ name: 'updated_at' })
    public updatedAt: Date

    @DeleteDateColumn({ name: 'deleted_at' })
    public deletedAt: Date

    @VersionColumn()
    public version: number
}
