import { Employee } from './employee';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Contract {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    start_date: Date;

    @Column()
    end_date: Date;

    @Column()
    salary: number;

    @Column()
    bonus: number;

    @Column()
    status: number;

    @ManyToOne(type => Employee, employee => employee.contracts)
    employee: Employee;

}