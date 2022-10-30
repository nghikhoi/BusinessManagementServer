import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn} from "typeorm";
import { Transporter } from "./transporter";
import {Bill} from "./bill";

@Entity()
export class Transport {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    transporter_id: number;

    @ManyToOne(type => Transporter, transporter => transporter.transports)
    @JoinColumn({name: "transporter_id"})
    transporter: Transporter;

    @Column()
    tracking: string;

    @OneToOne(type => Bill, bill => bill.transport)
    bill: Bill

    @Column({
        default: 0
    })
    ship_cost: number;

}
