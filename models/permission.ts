import { Position } from './position';
import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Permission {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({
        nullable: true
    })
    description: string;

    @Column()
    data_type: number = 0;

    @Column({
        nullable: true
    })
    data_string: string;

    @Column({
        nullable: true
    })
    data_number: number;

    @Column({
        nullable: true
    })
    data_boolean: boolean;

    @ManyToMany(type => Position, position => position.permissions)
    position: Position;

}