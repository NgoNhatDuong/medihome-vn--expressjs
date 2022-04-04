import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    Unique,
    UpdateDateColumn,
    VersionColumn,
} from 'typeorm'
import { PrescriptionEntity } from './prescription.entity'
import { ReceiptNoteEntity } from './receipt-note.entity'
import UserRoleEntity from './user-role.entity'

@Entity('user')
export default class UserEntity {
    // id

    @Column({ name: 'organize_id' })
    public organizeId: number

    @PrimaryGeneratedColumn({ name: 'id' })
    public userId: number

    // tương ứng: 1 khách hàng <----> n đơn hàng
    @OneToMany(() => PrescriptionEntity, prescription => prescription.user)
    prescriptionList: PrescriptionEntity[]

    // tương ứng: 1 khách hàng <----> n đơn hàng
    @OneToMany(() => ReceiptNoteEntity, receiptNote => receiptNote.user)
    receiptNoteList: ReceiptNoteEntity[]

    // thông tin tài khoản
    @Column()
    @Unique(['username'])
    public username: string

    @Column()
    @Unique(['email'])
    public email: string

    @Column()
    public password: string

    @Column({ name: 'display_name' })
    public displayName: string

    @Column({ name: 'private_key' })
    public privateKey: string

    // thông tin cá nhân
    @Column({ length: 10 })
    public phone: string

    @Column()
    public birdthday: Date

    @Column()
    public avatar: string

    @Column()
    public gender: 'Male' | 'Female' | 'Other'

    // thông tin quyền
    @Column({ name: 'user_role_id' })
    public userRoleId = 2

    @ManyToOne(() => UserRoleEntity)
    @JoinColumn({ name: 'user_role_id' })
    public userRole: UserRoleEntity

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
