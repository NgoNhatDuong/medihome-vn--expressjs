import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import ProductEntity from './product.entity'
import { ReceiptNoteEntity } from './receipt-note.entity'

@Entity('stock_in')
export class StockInEntity {
    // id
    @PrimaryGeneratedColumn({ name: 'id' })
    public stockInId: number

    @Column({ name: 'organize_id' })
    public organizeId: number

    // tương ứng: n stock <----> 1 sản phẩm
    @Column({ name: 'product_id' })
    public productId: number

    @ManyToOne(() => ProductEntity, product => product.stockInList)
    @JoinColumn({ name: 'product_id' })
    public product: ProductEntity

    // tương ứng: n stock <----> 1 phiếu nhập
    @Column({ name: 'receipt_note_id' })
    public receiptNoteId: number

    @ManyToOne(() => ReceiptNoteEntity, receiptNote => receiptNote.stockInList)
    @JoinColumn({ name: 'receipt_note_id' })
    public receiptNote: ReceiptNoteEntity

    @Column()
    public quantity: number

    @Column({ name: 'expiry-date' })
    public expiryDate: Date

    @Column({ name: 'cost-price' })
    public costPrice: number
}
