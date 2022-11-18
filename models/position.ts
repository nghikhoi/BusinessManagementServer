import { Employee } from './employee';
import { Permission } from './permission';
import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Position {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @OneToOne(type => Position, postion => postion.parent)
    parent: Position;

    @OneToMany(type => Employee, employee => employee.position)
    employees: Employee[];

    @OneToMany(type => Permission, permission => permission.position)
    permissions: Permission[];

}