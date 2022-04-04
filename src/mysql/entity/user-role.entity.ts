import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('user_role')
export default class UserRoleEntity {
    @PrimaryGeneratedColumn({ name: 'id' })
    public userRoleId: number

    @Column()
    public role: 'Admin' | 'Manger' | 'User'
}
