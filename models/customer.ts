import { Message } from './message';
import { Bill } from './bill';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Customer {

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
    birthday: Date;

    @OneToMany(type => Bill, bill => bill.customer)
    bills: Bill[];

    @OneToMany(type => Message, message => message.customer)
    messages: Message[];

}