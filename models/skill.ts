import { SkillRecord } from './employee';
import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Skill {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({
        nullable: true
    })
    description: string;

    @OneToMany(type => SkillRecord, employeeSkill => employeeSkill.skill)
    employees: SkillRecord[];

}
