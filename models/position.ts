import {Employee} from './employee';
import {
    Column, DeleteDateColumn,
    Entity,
    JoinColumn,
    JoinTable,
    ManyToMany,
    ManyToOne,
    OneToMany,
    OneToOne,
    PrimaryColumn,
    PrimaryGeneratedColumn
} from "typeorm";

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

    @Column()
    supplement_salary: number = 0;

    @Column()
    can_view_orders: boolean = false;

    @Column()
    can_manage_orders: boolean = false;

    @Column()
    can_view_customers: boolean = false;

    @Column()
    can_manage_customers: boolean = false;

    @Column()
    can_view_sales: boolean = false;

    @Column()
    can_manage_sales: boolean = false;

    @Column()
    can_view_hr: boolean = false;

    @Column()
    can_manage_hr: boolean = false;

    @Column()
    can_view_config: boolean = false;

    @Column()
    can_manage_config: boolean = false;

    @DeleteDateColumn()
    deleted_at: Date;

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

    @ManyToOne(type => Position, position => position.position_records, {
        eager: true
    })
    @JoinColumn({name: 'position_id'})
    position: Position;

    @ManyToOne(type => Employee, employee => employee.position_records)
    @JoinColumn({name: "employee_id"})
    employee: Employee;

}
