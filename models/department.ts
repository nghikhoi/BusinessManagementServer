import { Employee } from './employee';
import {
    Column,
    DeleteDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    OneToOne,
    PrimaryColumn,
    PrimaryGeneratedColumn
} from "typeorm";

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

    @Column({
        nullable: true
    })
    phone_number: string;

    @Column({
        nullable: true
    })
    head_employee_id: string;

    @DeleteDateColumn()
    deleted_at: Date;

    @ManyToOne(type => Employee, employee => employee.department, {
        nullable: true
    })
    @JoinColumn({ name: "head_employee_id" })
    head_employee: Employee;

    @OneToMany(type => Employee, employee => employee.department)
    employees: Employee[];

}
