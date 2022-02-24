import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	Unique,
	CreateDateColumn,
	UpdateDateColumn,
	DeleteDateColumn,
	OneToMany,
} from 'typeorm'
import TokensEntity from './token.entity'

@Entity('User')
export default class UserEntity {
	@PrimaryGeneratedColumn({ name: 'id' })
	public userId: number

	@Column()
	@Unique(['username'])
	public username: string

	@Column()
	public password: string

	@Column()
	public email: string

	@Column({ length: 10 })
	public phone: string

	@OneToMany(() => TokensEntity, token => token.user)
	tokens: TokensEntity[]

	@CreateDateColumn({ name: 'created_at' })
	createdAt: Date

	@UpdateDateColumn({ name: 'updated_at' })
	updatedAt: Date

	@DeleteDateColumn({ name: 'deleted_at' })
	deletedAt: Date
}
