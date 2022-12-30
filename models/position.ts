import { Employee } from './employee';
import { Permission } from './permission';
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

export enum PositionPermission {

    ALL, MAN_ORDERS, MAN_SALES, VIEW_SALES, VIEW_HR, MAN_HR, NONE

}

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

    @Column({
        type: "enum",
        enum: PositionPermission,
        default: PositionPermission.NONE
    })
    permission: PositionPermission;

    @Column()
    supplement_salary: number;

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

    is_current: boolean; //TODO

    @ManyToOne(type => Position, position => position.position_records)
    position: Position;

    @ManyToOne(type => Employee, employee => employee.position_records)
    @JoinColumn({ name: "employee_id" })
    employee: Employee;

}
