import { Employee } from './employee';
import { Product } from './product';
import { Customer } from './customer';
import {
    AfterLoad,
    Column, CreateDateColumn,
    Entity,
    JoinColumn,
    JoinTable,
    ManyToMany,
    ManyToOne,
    OneToMany,
    OneToOne,
    PrimaryColumn,
    PrimaryGeneratedColumn
} from "typeorm";
import {VoucherType, Voucher} from "./voucher";

export enum Payment {

    CASH = 'CASH',
    CREDIT_CARD = 'CREDIT_CARD',
    DEBIT_CARD = 'DEBIT_CARD',
    BANK_TRANSFER = 'BANK_TRANSFER',
    PAYPAL = 'PAYPAL',
    BITCOIN = 'BITCOIN',
    WECHAT = 'WECHAT',
    ALIPAY = 'ALIPAY',
    WALLET = 'WALLET',
    OTHER = 'OTHER'

}

export enum OrderStatus {
    PENDING = 'PENDING',
    CANCELED = 'CANCELED',
    COMPLETED = 'COMPLETED',
    RETURNED = 'RETURNED',
}

@Entity()
export class Order {

    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    created_at: Date;

    @Column({
        nullable: true
    })
    completed_at: Date;

    @Column()
    vat_rate: number;

    @Column()
    customer_id: string;

    @Column()
    address: string;

    @ManyToOne(type => Customer, customer => customer.bills)
    @JoinColumn({name: 'customer_id'})
    customer: Customer

    @Column()
    create_employee_id: string;

    @ManyToOne(type => Employee, employee => employee.bills)
    @JoinColumn({name: 'create_employee_id'})
    create_employee: Employee;

    @Column({
        type: "enum",
        enum: OrderStatus,
        default: OrderStatus.PENDING
    })
    status: OrderStatus

    @OneToMany(() => OrderItem, billDetail => billDetail.bill, {
        eager: true,
        cascade: true
    })
    items: OrderItem[]

    @Column({
        type: "enum",
        enum: Payment,
        default: Payment.CASH
    })
    payment: Payment

    @Column({
        nullable: true
    })
    bank: string

    @ManyToMany(type => Voucher, voucherProfile => voucherProfile.applied_products, {
        cascade: true
    })
    @JoinTable({
        name: "join_order_voucher_profile",
        joinColumn: {
            name: "order_id",
            referencedColumnName: "id"
        },
        inverseJoinColumn: {
            name: "voucher_code",
            referencedColumnName: "code"
        }
    })
    applied_vouchers: Voucher[];

}

@Entity()
export class OrderItem {

    @PrimaryColumn()
    order_id: number;

    @PrimaryColumn()
    product_id: number;

    @ManyToOne(() => Product, product => product.items)
    @JoinColumn({name: "product_id"})
    product: Product;

    @Column({
        type: "decimal"
    })
    unit_price: number;

    @Column({
        default: 1
    })
    quantity: number;

    @ManyToOne(type => Order, bill => bill.items)
    @JoinColumn({
        name: "bill_id"
    })
    bill: Order

}
