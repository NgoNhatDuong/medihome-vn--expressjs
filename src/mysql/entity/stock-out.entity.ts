import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { PrescriptionEntity } from './prescription.entity'
import ProductEntity from './product.entity'

@Entity('stock_out')
export class StockOutEntity {
    // id
    @PrimaryGeneratedColumn({ name: 'id' })
    public stockOutId: number

    @Column({ name: 'organize_id' })
    public organizeId: number

    // tương ứng: n stock <----> 1 sản phẩm
    @Column({ name: 'product_id' })
    public productId: number

    @ManyToOne(() => ProductEntity, product => product.stockOutList)
    @JoinColumn({ name: 'product_id' })
    public product: ProductEntity

    // tương ứng: n stock <----> 1 đơn hàng
    @Column({ name: 'prescription_id' })
    public prescriptionId: number

    @ManyToOne(() => PrescriptionEntity, prescription => prescription.stockOutList)
    @JoinColumn({ name: 'prescription_id' })
    public prescription: PrescriptionEntity

    // số lượng + HSD
    @Column()
    public quantity: number

    @Column({ name: 'expiry-date' })
    public expiryDate: Date

    // giá
    @Column({ name: 'cost-price' })
    public costPrice: number

    @Column({ name: 'expected-price' })
    public expectedPrice: number

    @Column({ name: 'actual-price' })
    public actualPrice: number

    @Column()
    public discount: number
}
