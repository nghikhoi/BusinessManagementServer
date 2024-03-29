import { Product } from './product';
import {
    ChildEntity,
    Column, DeleteDateColumn,
    Entity,
    JoinColumn, JoinTable, ManyToMany,
    ManyToOne,
    OneToMany,
    PrimaryColumn,
    PrimaryGeneratedColumn,
    TableInheritance
} from "typeorm";
import {Order} from "./order";

export enum DiscountType {
    PERCENTAGE = 'PERCENTAGE',
    AMOUNT = 'AMOUNT'
}

@Entity()
export class VoucherType {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({
        nullable: true
    })
    description: string;

    @Column(
        {
            type: 'enum',
            enum: DiscountType,
            default: DiscountType.PERCENTAGE
        }
    )
    discount_type: DiscountType;

    @Column(
        {
            type: 'decimal',
        }
    )
    discount: number;

    @ManyToMany(type => Product, product => product.required_vouchers)
    @JoinTable()
    require_product: Product[];

    @Column({
        nullable: true
    })
    require_product_count: number;

    @Column({
        nullable: true
    })
    require_min_net: number;

    @DeleteDateColumn()
    deleted_at: Date;

    @OneToMany(type => Voucher, voucher => voucher.voucher_type)
    vouchers: Voucher[];

}

@Entity()
export class Voucher {

    @PrimaryColumn()
    code: string;

    @Column()
    type: number = 0;

    @Column()
    release_date: Date;

    @Column()
    expire_date: Date;

    @DeleteDateColumn()
    deleted_at: Date;

    @ManyToOne(type => VoucherType, voucherType => voucherType.vouchers)
    @JoinColumn({name: "type"})
    voucher_type: VoucherType;

    @ManyToMany(type => Order, bill => bill.applied_vouchers)
    applied_products: Order[]

}
