import { Product } from './product';
import {
    ChildEntity,
    Column,
    Entity,
    JoinColumn, JoinTable, ManyToMany,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    TableInheritance
} from "typeorm";
import {Bill} from "./bill";

export enum DiscountType {
    PERCENTAGE = 'PERCENTAGE',
    AMOUNT = 'AMOUNT'
}

@Entity()
export class Voucher {

    @PrimaryGeneratedColumn("uuid")
    id: string;

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
    require_min_value: number;

    @Column()
    code: string;

    @Column()
    release_date: Date;

    @Column()
    expire_date: Date;

    @ManyToMany(type => Bill, bill => bill.used_vouchers)
    used_on_bill: Bill[]

}
