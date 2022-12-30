import { Column, Entity, JoinColumn, JoinTable, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';
import { Employee } from './employee';

@Entity()
export class OvertimeRecord {

    @PrimaryColumn()
    employee_id: string;

    @PrimaryColumn()
    day: number;

    @PrimaryColumn()
    month: number;

    @PrimaryColumn()
    year: number;

    @Column()
    from: Date;

    @Column()
    to: Date;

    @ManyToOne(type => Employee, employee => employee.overtime_records)
    @JoinColumn({ name: "employee_id" })
    employee: Employee;

}

export class OvertimeOverview { //TODO

    employee_id: string;

    month: number;

    year: number;

    num_of_overtime_days: number;

    avg_overtime_duration: number;

    total_overtime_pay: number;

    employee: Employee;

    overtime_records: OvertimeRecord[];

}

@Entity()
export class SalaryRecord {

    @PrimaryColumn()
    employee_id: string;

    @PrimaryColumn()
    month: number;

    @PrimaryColumn()
    year: number;

    @Column()
    basic_salary: number;

    @Column()
    bonus_salary: number;

    @Column()
    supplement_salary: number;

    @Column()
    total_overtime_pay: number;

    @Column()
    total_salary: number;

    @ManyToOne(type => Employee, employee => employee.salary_records)
    @JoinColumn({ name: "employee_id" })
    employee: Employee;

}
