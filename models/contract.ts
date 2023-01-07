import {Employee} from './employee';
import {Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class ContractType {

    @PrimaryColumn()
    id: number;

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

    @Column()
    employee_id: string;

    @Column()
    type_id: number;

    @Column({
        nullable: true
    })
    description: string;

    @Column()
    start_date: Date;

    @Column()
    end_date: Date;

    /*    @Column()
        is_current: boolean;*/ //TODO

    @Column({
        nullable: true
    })
    company_representative_employee_id: string;

    @ManyToOne(type => ContractType, contract_type => contract_type.contracts, {
        eager: true
    })
    @JoinColumn({ name: "type_id" })
    type: ContractType;

    @ManyToOne(type => Employee, employee => employee.contracts)
    @JoinColumn({name: "employee_id"})
    employee: Employee;

}
