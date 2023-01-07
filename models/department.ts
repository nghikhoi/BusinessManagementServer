import { Employee } from './employee';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Department {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({
        nullable: true
    })
    description: string;

    @Column()
    phone_number: string;

    @Column()
    head_employee_id: string;

    @OneToOne(type => Employee, employee => employee.department)
    @JoinColumn({ name: "head_employee_id" })
    head_employee: Employee;

    @OneToMany(type => Employee, employee => employee.department)
    employees: Employee[];

}
