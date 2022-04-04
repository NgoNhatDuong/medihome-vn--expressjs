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
import { CustomerEntity } from './customer.entity'
import { AdmissionEntity } from './admission.entity'
import { StockOutEntity } from './stock-out.entity'
import UserEntity from './user.entity'

@Entity('prescription')
export class PrescriptionEntity {
    // id
    @PrimaryGeneratedColumn({ name: 'id' })
    public orderId: number

    @Column({ name: 'organize_id' })
    public organizeId: number

    // tương ứng: n đơn hàng <----> 1 khách hàng
    @Column({ name: 'customer_id' })
    public customerId: number

    @ManyToOne(() => CustomerEntity, customer => customer.prescriptionList)
    @JoinColumn({ name: 'customer_id' })
    public customer: CustomerEntity

    // tương ứng: n đơn hàng <----> 1 nhân viên bán thuốc
    @Column({ name: 'user_id' })
    public userId: number

    @ManyToOne(() => UserEntity, user => user.prescriptionList)
    @JoinColumn({ name: 'user_id' })
    public user: UserEntity

    // tương ứng: 1 đơn hàng <----> 1 lượt khám
    @Column({ name: 'admission_id' })
    public admissionId: number

    @ManyToOne(() => AdmissionEntity, admission => admission.prescriptionList)
    @JoinColumn({ name: 'admission_id' })
    admission: AdmissionEntity

    // tương ứng: 1 đơn hàng <----> n stockOut
    @OneToMany(() => StockOutEntity, stockOut => stockOut.prescription)
    stockOutList: StockOutEntity[]

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
    public totalMoney: number // tổng tiền = tiền sản phẩm - sellerPaysShip - discount

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
