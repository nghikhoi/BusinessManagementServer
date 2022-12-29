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
    is_current: boolean;

    @Column({
        nullable: true
    })
    company_representative_employee_id: string;

    @ManyToOne(type => ContractType, contract_type => contract_type.contracts, {
        eager: true
    })
    type: ContractType;

    @ManyToOne(type => Employee, employee => employee.contracts)
    employee: Employee;

}