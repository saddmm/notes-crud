import { BaseEntity, BeforeInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import bcrypt from 'bcrypt'
import { Note } from './note.entity'

@Entity('users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({
    unique: true,
    type: 'varchar',
  })
  username!: string
  
  @Column({
    unique: true,
    type: 'varchar',
  })
  email!: string

  @Column({
    type: 'varchar',
  })
  password!: string

  @OneToMany(() => Note, (note) => note.user, {nullable: true})
  notes?: Note[]

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10)
  }
}
