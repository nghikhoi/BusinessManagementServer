import { Position } from './position';
import { Skill } from './skill';
import { Contract } from './contract';
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Department, OvertimeRecord } from './department';

@Entity()
export class Employee {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    phone: string;

    @Column()
    address: string;

    @Column()
    citizen_id: string;

    @Column()
    position_id: string;

    @ManyToOne(type => Position, position => position.employees)
    @JoinColumn({name: 'position_id'})
    position: Position;

    @OneToMany(type => Contract, contract => contract.employee)
    contracts: Contract[];

    @ManyToOne(type => Department, department => department.employees)
    department: Department;

    @OneToMany(type => EmployeeSkill, skill => skill.employee)
    skills: EmployeeSkill[];

    @OneToMany(type => OvertimeRecord, overtime_record => overtime_record.employee)
    overtime_records: OvertimeRecord[];

}

@Entity()
export class EmployeeSkill {
    
        @PrimaryColumn()
        employee_id: string;
    
        @PrimaryColumn()
        skill_id: string;

        @Column()
        level: number;

        @ManyToOne(type => Employee, employee => employee.skills)
        @JoinColumn({ name: "employee_id" })
        employee: Employee;

        @ManyToOne(type => Skill, skill => skill.employees)
        @JoinColumn({ name: "skill_id" })
        skill: Skill;
    
}