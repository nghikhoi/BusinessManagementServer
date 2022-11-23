import { Voucher } from './voucher';
import { Message, Feedback } from './message';
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Provider } from './provider';
import { BillDetail } from './bill';

@Entity()
export class ProductCategory {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @ManyToMany(type => Product, product => product.categories)
    @JoinTable()
    products: Product[];

}

@Entity()
export class Product {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({
        nullable: true
    })
    description: string;

    @Column()
    unit: string;

    @Column()
    price: number;

    @Column()
    quantity: number;

    // @Column({
    //     nullable: true
    // })
    // images: string[]; //TODO: find a way to store image urls

    @ManyToMany(type => ProductCategory, category => category.products)
    categories: ProductCategory[];

    @OneToMany(type => BillDetail, bill_detail => bill_detail.product)
    bill_details: BillDetail[];

    @ManyToOne(type => Provider, provider => provider.products)
    provider: Provider;

    @OneToMany(type => Feedback, feedback => feedback.product)
    feedbacks: Feedback[];

    @ManyToMany(type => Voucher, voucher_profile => voucher_profile.require_product)
    required_vouchers: Voucher[];

}