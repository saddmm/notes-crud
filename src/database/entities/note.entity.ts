import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('notes')
export class Note extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    title!: string

    @Column()
    content!: string

}