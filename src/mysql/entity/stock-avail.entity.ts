import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import ProductEntity from './product.entity'

@Entity('stock_avail')
export class StockAvailEntity {
    // id
    @PrimaryGeneratedColumn({ name: 'id' })
    public stockAvailId: number

    @Column({ name: 'organize_id' })
    public organizeId: number

    // tương ứng: n stock <----> 1 sản phẩm
    @Column({ name: 'product_id' })
    public productId: number

    @ManyToOne(() => ProductEntity, product => product.stockAvailList)
    @JoinColumn({ name: 'product_id' })
    public product: ProductEntity

    @Column()
    public quantity: number

    @Column({ name: 'expiry-date' })
    public expiryDate: Date

    @Column({ name: 'cost-price' })
    public costPrice: number

    @Column({ name: 'retail-price' })
    public retailPrice: number

    @Column({ name: 'wholesale-price' })
    public wholesalePrice: number
}
