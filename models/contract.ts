import { Employee } from './employee';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

export enum ContractType {

    INTERN, ONE_YEAR, THREE_YEARS, LONG_TIME

}

@Entity()
export class Contract {

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
        enum: ContractType,
        default: ContractType.INTERN
    })
    type: ContractType;

    @Column()
    start_date: Date;

    @Column()
    end_date: Date;

    @Column()
    salary: number;

    @Column()
    bonus: number = 0;

    @Column()
    status: number = 0;

    @ManyToOne(type => Employee, employee => employee.contracts)
    employee: Employee;

}