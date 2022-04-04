import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    VersionColumn,
} from 'typeorm'
import { StockAvailEntity } from './stock-avail.entity'
import { StockInEntity } from './stock-in.entity'
import { StockOutEntity } from './stock-out.entity'

@Entity('product')
export default class ProductEntity {
    // id
    @PrimaryGeneratedColumn({ name: 'id' })
    public productId: number

    @Column({ name: 'organize_id' })
    public organizeId: number

    @Column({ name: 'brand_name' })
    public brandName: string // tên biệt dược

    @Column({ name: 'generic_drug' })
    public genericDrug: string // tên gốc

    @Column()
    public image: string

    @Column()
    public unit: string // đơn vị: lọ, ống, vỉ

    @Column()
    public origin: string // xuất xứ

    // tương ứng: 1 sản phẩm <----> n stockOut
    @OneToMany(() => StockAvailEntity, stockAvail => stockAvail.product)
    stockAvailList: StockAvailEntity[]

    // tương ứng: 1 sản phẩm <----> n stockOut
    @OneToMany(() => StockInEntity, stockIn => stockIn.product)
    stockInList: StockInEntity[]

    // tương ứng: 1 sản phẩm <----> n stockOut
    @OneToMany(() => StockOutEntity, stockOut => stockOut.product)
    stockOutList: StockOutEntity[]

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
