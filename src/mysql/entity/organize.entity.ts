import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    VersionColumn,
} from 'typeorm'

@Entity('organize')
export default class OrganizeEntity {
    @PrimaryGeneratedColumn({ name: 'id' })
    public organizeId: number

    @Column({ name: 'organize_name' })
    public organizeName: string

    @Column()
    public address: string

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
