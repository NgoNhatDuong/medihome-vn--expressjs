import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
	DeleteDateColumn,
	ManyToOne,
	JoinColumn,
} from 'typeorm'
import UserEntity from './user.entity'

@Entity('Token')
export default class TokensEntity {
	@PrimaryGeneratedColumn({ name: 'id' })
	public tokenId: number

	@Column({ name: 'user_id' })
	public userId: number

	@ManyToOne(() => UserEntity, user => user.userId)
	@JoinColumn({ name: 'user_id' })
	public user: UserEntity

	@Column({ name: 'access_token' })
	public accessToken: string

	@Column({ name: 'refresh_token' })
	public refreshToken: string

	@Column({ name: 'expires_in' })
	public expiresIn: Date

	@Column()
	public status: 'active' | 'deactive' | 'expired'

	@CreateDateColumn({ name: 'created_at' })
	createdAt: Date

	@UpdateDateColumn({ name: 'updated_at' })
	updatedAt: Date

	@DeleteDateColumn({ name: 'deleted_at' })
	deletedAt: Date
}
