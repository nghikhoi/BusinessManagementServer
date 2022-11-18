import { Product } from './product';
import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Image } from "./file";

@Entity()
export class Provider {

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

    @OneToMany(() => Product, product => product.provider)
    products: Product[];

    @Column({
        nullable: true
    })
    avatar_id: string

    @OneToOne(type => Image, image => image.provider)
    @JoinColumn({name: 'avatar_id'})
    avatar: Image

    @CreateDateColumn()
    createdAt: Date

}
