import { Product } from './product';
import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

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
    avatar_url: string

    @CreateDateColumn()
    createdAt: Date

}
