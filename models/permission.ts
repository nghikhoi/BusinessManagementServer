import { Position } from './position';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Permission {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    data_type: number;

    @Column()
    data_string: string;

    @Column()
    data_number: number;

    @Column()
    data_boolean: boolean;

    @ManyToOne(type => Position, position => position.permissions)
    position: Position;

}