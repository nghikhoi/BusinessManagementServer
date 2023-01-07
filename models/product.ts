import {VoucherType} from './voucher';
import {Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Provider} from './provider';
import {OrderItem} from './order';

@Entity()
export class ProductCategory {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @OneToMany(type => Product, product => product.category)
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
    stock: number;

    // @Column({
    //     nullable: true
    // })
    // images: string[]; //TODO: find a way to store image urls

    @Column()
    category_id: number;

    @ManyToOne(type => ProductCategory, category => category.products, {
        eager: true
    })
    @JoinColumn({name: "category_id"})
    category: ProductCategory;

    @OneToMany(type => OrderItem, bill_detail => bill_detail.product)
    items: OrderItem[];

    @ManyToOne(type => Provider, provider => provider.products, {
        eager: true
    })
    provider: Provider;

    @ManyToMany(type => VoucherType, voucher_profile => voucher_profile.require_product)
    required_vouchers: VoucherType[];

}
