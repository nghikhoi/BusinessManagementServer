import { Employee } from './employee';
import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ContractType {

    @PrimaryColumn()
    id: string;

    @Column()
    name: string;

    @Column({
        nullable: true
    })
    description: string;

    @Column()
    base_salary: number;

    @Column()
    period: number;

    @OneToMany(contract => Contract, contract => contract.type)
    contracts: Contract[];

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

    @ManyToOne(type => ContractType, contract_type => contract_type.contracts, {
        eager: true
    })
    type: ContractType;

    @ManyToOne(type => Employee, employee => employee.contracts)
    employee: Employee;

}