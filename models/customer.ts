import { Gender } from './employee';
import { Order } from './order';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Customer {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column({
        unique: true
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
        nullable: true,
        unique: true
    })
    citizen_id: string;

    @Column()
    address: string;

    @Column()
    birthday: Date;

    @OneToMany(type => Order, bill => bill.customer)
    bills: Order[];

}
