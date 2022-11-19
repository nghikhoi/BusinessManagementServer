import { SalaryRecord, OvertimeRecord } from './salary';
import { Position } from './position';
import { Skill } from './skill';
import { Contract } from './contract';
import { AfterLoad, BeforeInsert, BeforeUpdate, Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Department } from './department';
import { randomBytes } from 'crypto';
import { hashSync } from '../routes/auth/auth.methods';

export enum Gender {
    MALE = 'male',
    FEMALE = 'female',
    OTHER = 'other'
}

@Entity()
export class Employee {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({
        nullable: false,
        update: false,
        unique: true,
    })
    username: string;

    @Column({
        nullable: false,
        select: false,
    })
    password: string

    private tempPassword: string;

    @AfterLoad()
    private loadTempPassword(): void {
        this.tempPassword = this.password;
    }

    @BeforeInsert()
    @BeforeUpdate()
    private encryptPassword(): void {
        if (!this.salt) {
            this.salt = randomBytes(16).toString('base64');
        }
        if (this.tempPassword !== this.password) {
            this.password = this.tempPassword = hashSync(this.password, this.salt).toString('base64');
        }
    }

    @Column({
        nullable: true,
        select: false
    })
    salt: string

    @Column({
        nullable: true
    })
    refresh_token: string

    @Column({
        nullable: true
    })
    name: string;

    @Column()
    email: string;

    @Column()
    phone: string;

    @Column({
        nullable: true
    })
    address: string;

    @Column({
        type: "enum",
        enum: Gender,
        default: Gender.OTHER,
        nullable: false
    })
    gender: Gender

    @Column({
        nullable: true
    })
    birthday: Date

    @Column({
        nullable: true
    })
    citizen_id: string;

    @Column({
        nullable: true
    })
    position_id: string;

    @ManyToOne(type => Position, position => position.employees)
    @JoinColumn({name: 'position_id'})
    position: Position;

    @OneToMany(type => Contract, contract => contract.employee)
    contracts: Contract[];

    @Column({
        nullable: true
    })
    department_id: string;

    @ManyToOne(type => Department, department => department.employees)
    @JoinColumn({name: 'department_id'})
    department: Department;

    @OneToMany(type => EmployeeSkill, skill => skill.employee)
    skills: EmployeeSkill[];

    @OneToMany(type => SalaryRecord, salary_record => salary_record.employee)
    salary_records: SalaryRecord[];

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