import { Gender } from './employee';
import { Order } from './order';
import {Column, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Customer {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    name: string;

    @Column({
        nullable: true
    })
    email: string;

    @Column({
        nullable: true
    })
    phone: string;

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
    citizen_id: string;

    @Column({
        nullable: true
    })
    address: string;

    @Column({
        nullable: true
    })
    birthday: Date = new Date();

    @DeleteDateColumn()
    deleted_at: Date;

    @OneToMany(type => Order, bill => bill.customer)
    bills: Order[];

}
