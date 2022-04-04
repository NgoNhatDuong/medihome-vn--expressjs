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
import { PrescriptionEntity } from './prescription.entity'
import { AdmissionEntity } from './admission.entity'

@Entity('customer')
export class CustomerEntity {
    // id
    @PrimaryGeneratedColumn({ name: 'id' })
    public customerId: number

    @Column({ name: 'organize_id' })
    public organizeId: number

    // tương ứng: 1 khách hàng <----> n lượt khám
    @OneToMany(() => AdmissionEntity, admission => admission.customer)
    admissionList: AdmissionEntity[]

    // tương ứng: 1 khách hàng <----> n đơn hàng
    @OneToMany(() => PrescriptionEntity, prescription => prescription.customer)
    prescriptionList: PrescriptionEntity[]

    // customer info
    @Column({ name: 'customer_name' })
    public customerName: string

    @Column({ length: 10 })
    public phone: string

    @Column()
    public birdthday: Date

    @Column()
    public address: string

    @Column()
    public gender: 'Male' | 'Female' | 'Other'

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
