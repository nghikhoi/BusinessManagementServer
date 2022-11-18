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
    bonus_type: number;

    @Column()
    bonus: number;

    @ManyToOne(type => Employee, employee => employee.salary_records)
    @JoinColumn({ name: "employee_id" })
    employee: Employee;

    @OneToMany(type => OvertimeRecord, overtime_record => overtime_record.employee)
    @JoinColumn([
        { name: "employee_id", referencedColumnName: "employee_id" },
        { name: "month", referencedColumnName: "month" },
        { name: "year", referencedColumnName: "year" }
    ])
    overtime_records: OvertimeRecord[];

}