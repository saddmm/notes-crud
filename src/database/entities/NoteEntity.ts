import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./UserEntity";

@Entity('notes')
export class Note extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number

    @Column({
        type: 'varchar',
    })
    title!: string

    @Column({type: 'text'})
    content!: string

    @ManyToOne(() => User, (user) => user.notes)
    user!: User
}