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
    
    @OneToOne(type => Employee, employee => employee.department)
    head_employee: Employee;

    @OneToMany(type => Employee, employee => employee.department)
    employees: Employee[];

}