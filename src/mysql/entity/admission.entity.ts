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
import { PrescriptionEntity } from './prescription.entity'

@Entity('admission')
export class AdmissionEntity {
    // id
    @PrimaryGeneratedColumn({ name: 'id' })
    public admissionId: number

    @Column({ name: 'organize_id' })
    public organizeId: number

    // tương ứng: n lượt khám <----> 1 khách hàng
    @Column({ name: 'customer_id' })
    public customerId: number

    @ManyToOne(() => CustomerEntity, customer => customer.admissionList)
    @JoinColumn({ name: 'customer_id' })
    customer: CustomerEntity

    // tương ứng: 1 lượt khám <----> n đơn hàng
    @OneToMany(() => PrescriptionEntity, prescription => prescription.admission)
    prescriptionList: PrescriptionEntity[]

    // thời gian khám bệnh
    @Column({ name: 'time_start' })
    public timeStart: Date

    @Column({ name: 'time_end' })
    public timeEnd: Date

    @Column({ name: 'total_money' })
    public totalMoney: number

    // lưu trữ action
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
