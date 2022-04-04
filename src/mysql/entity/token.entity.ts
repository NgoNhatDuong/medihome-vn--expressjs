import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    VersionColumn,
} from 'typeorm'

@Entity('token')
export default class TokenEntity {
    @PrimaryGeneratedColumn({ name: 'id' })
    public tokenId: number

    @Column({ name: 'user_id' })
    public userId: number

    @Column({ name: 'forgot_token' })
    public forgotToken: string

    @Column({ name: 'access_token' })
    public accessToken: string

    @Column({ name: 'refresh_token' })
    public refreshToken: string

    @Column({ name: 'expires_in' })
    public expiresIn: Date

    @Column()
    public status: 'active' | 'deactive' | 'expired' | 'forgot'

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
