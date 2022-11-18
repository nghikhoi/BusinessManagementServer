import { Employee, EmployeeSkill } from './employee';
import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Skill {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @OneToMany(type => EmployeeSkill, employeeSkill => employeeSkill.skill)
    employees: EmployeeSkill[];

}