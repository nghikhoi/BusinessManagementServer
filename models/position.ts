import { Employee } from './employee';
import { Permission } from './permission';
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Position {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({
        nullable: true
    })
    description: string;

    @OneToOne(type => Position, postion => postion.parent)
    parent: Position;

    @ManyToMany(type => Permission, permission => permission.position, {
        eager: true
    })
    @JoinTable()
    permissions: Permission[];

    @OneToMany(type => PositionRecord, positionRecord => positionRecord.position)
    position_records: PositionRecord[];

}

@Entity()
export class PositionRecord {

    @PrimaryColumn()
    employee_id: string;

    @PrimaryColumn()
    start_date: Date;

    @PrimaryColumn()
    end_date: Date;

    @Column()
    position_id: number;

    @ManyToOne(type => Position, position => position.position_records)
    position: Position;

    @ManyToOne(type => Employee, employee => employee.position_records)
    @JoinColumn({ name: "employee_id" })
    employee: Employee;

}