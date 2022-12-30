import {BonusRecord} from './bonus';
import {Order} from './order';
import {SalaryRecord, OvertimeRecord, OvertimeOverview} from './salary';
import {Position, PositionRecord} from './position';
import {SkillType} from './skill';
import {Contract} from './contract';
import {
    AfterLoad,
    BeforeInsert,
    BeforeUpdate,
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    OneToOne,
    PrimaryColumn,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {Department} from './department';
import {randomBytes} from 'crypto';
import {hashSync} from '../routes/auth/auth.methods';

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

    @Column({
        unique: true
    })
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
        nullable: true,
        unique: true
    })
    citizen_id: string;

    @Column({
        nullable: true
    })
    termination_date: Date;

    @OneToMany(type => PositionRecord, position_records => position_records.employee)
    position_records: PositionRecord[];

    @OneToMany(type => Contract, contract => contract.employee)
    contracts: Contract[];

    @Column({
        nullable: true
    })
    department_id: string;

    @ManyToOne(type => Department, department => department.employees)
    @JoinColumn({name: 'department_id'})
    department: Department;

    @OneToMany(type => Skill, skill => skill.employee, {
        cascade: true,
        eager: true
    })
    skills: Skill[];

    @OneToMany(type => SalaryRecord, salary_record => salary_record.employee, {
        eager: true
    })
    salary_records: SalaryRecord[];

    @OneToMany(type => OvertimeRecord, overtime_record => overtime_record.employee, {
        eager: true
    })
    overtime_records: OvertimeRecord[];

    @OneToMany(type => Order, bill => bill.create_employee)
    bills: Order[];

    @OneToMany(type => BonusRecord, bonus_record => bonus_record.employee)
    bonus_records: BonusRecord[];

}

export enum SkillLevel {

    Unrated, Acceptable, Good, Excellent

}

@Entity()
export class Skill {

    @PrimaryColumn()
    employee_id: string;

    @PrimaryColumn()
    skill_id: string;

    @Column({
        type: "enum",
        enum: SkillLevel,
        default: SkillLevel.Unrated,
    })
    level: SkillLevel;

    @UpdateDateColumn()
    updated_at: Date;

    @ManyToOne(type => Employee, employee => employee.skills)
    @JoinColumn({name: "employee_id"})
    employee: Employee;

    @ManyToOne(type => SkillType, skill => skill.employees, {
        eager: true
    })
    @JoinColumn({name: "skill_id"})
    skill: SkillType;

}
