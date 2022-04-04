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
import { ReceiptNoteEntity } from './receipt-note.entity'

@Entity('provider')
export class ProviderEntity {
    // id
    @PrimaryGeneratedColumn({ name: 'id' })
    public providerId: number

    @Column({ name: 'organize_id' })
    public organizeId: number

    // tương ứng: 1 nhà cung cấp <----> n phiếu nhập
    @OneToMany(() => ReceiptNoteEntity, receiptNote => receiptNote.provider)
    receiptNoteList: ReceiptNoteEntity[]

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

    // khu vực action
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
