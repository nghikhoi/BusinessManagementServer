import { Employee, Skill as Skill } from './employee';
import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class SkillType {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({
        nullable: true
    })
    description: string;

    @OneToMany(type => Skill, employeeSkill => employeeSkill.skill)
    employees: Skill[];

}