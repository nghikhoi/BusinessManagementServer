import { Employee } from './employee';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Department {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    status: number;
    
    @OneToOne(type => Employee, employee => employee.department)
    head_employee: Employee;

    @OneToMany(type => Employee, employee => employee.department)
    employees: Employee[];

    @OneToMany(type => OvertimeRecord, overtime_record => overtime_record.department)
    overtime_records: OvertimeRecord[];

}

@Entity()
export class OvertimeRecord {

    @PrimaryColumn()
    department_id: number;

    @PrimaryColumn()
    employee_id: string;

    @PrimaryColumn()
    date: Date;

    @Column()
    total_overtime: number;

    @ManyToOne(type => Department, department => department.overtime_records)
    @JoinColumn({ name: "department_id" })
    department: Department;

    @ManyToOne(type => Employee, employee => employee.overtime_records)
    @JoinColumn({ name: "employee_id" })
    employee: Employee;

}