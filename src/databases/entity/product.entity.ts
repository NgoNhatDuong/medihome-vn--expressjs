import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
	DeleteDateColumn,
} from 'typeorm'

@Entity('Product')
export default class ProductEntity {
	@PrimaryGeneratedColumn()
	public id: number

	@Column()
	public name: string

	@Column()
	public quantity: number

	@Column()
	public price: number

	@CreateDateColumn({ name: 'created_at' })
	createdAt: Date

	@UpdateDateColumn({ name: 'updated_at' })
	updatedAt: Date

	@DeleteDateColumn({ name: 'deleted_at' })
	deletedAt: Date
}
