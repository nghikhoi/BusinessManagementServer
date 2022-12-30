import {Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn} from 'typeorm';
import { Employee } from './employee';

@Entity()
export class BonusType {

    @PrimaryColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    amount: number;

    @OneToMany(type => BonusRecord, bonus_record => bonus_record.bonus_type)
    @JoinColumn({ name: "id" })
    bonus_records: BonusRecord[];

}

@Entity()
export class BonusRecord {

    @PrimaryColumn()
    employee_id: string;

    @PrimaryColumn()
    month: number;

    @PrimaryColumn()
    year: number;

    @Column()
    bonus_type_id: number;

    @Column()
    amount: number;

    @ManyToOne(type => Employee, employee => employee.bonus_records)
    @JoinColumn({ name: "employee_id" })
    employee: Employee;

    @ManyToOne(type => BonusType, bonus_type => bonus_type.bonus_records)
    @JoinColumn({ name: "bonus_type_id" })
    bonus_type: BonusType;

}
