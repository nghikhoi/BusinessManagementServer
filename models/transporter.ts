import {Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne, JoinColumn, CreateDateColumn} from "typeorm";
import {Transport} from "./transport";
import {Image} from "./file";

@Entity()
export class Transporter {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        nullable: false
    })
    name: string;

    @Column({
        nullable: true
    })
    description: string;

    @OneToMany(type => Transport, transport => transport.transporter)
    transports: Transport[];

    @Column({
        nullable: true
    })
    avatar_id: string

    @OneToOne(type => Image, image => image.transporter)
    @JoinColumn({name: 'avatar_id'})
    avatar: Image

    @CreateDateColumn()
    createdAt: Date

}
