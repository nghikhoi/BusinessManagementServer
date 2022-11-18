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
import {VoucherProfile} from "./voucher";

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

export enum BillStatus {
    WAITING = "WAITING",
    PROCESSING = "PROCESSING",
    TRANSPORTING = "TRANSPORTING",
    COMPLETED = "COMPLETED",
    CANCELED = "CANCELED"
}

@Entity()
export class Bill {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        nullable: true
    })
    transport_id: string;

    @CreateDateColumn()
    created_at: Date;

    @Column()
    user_id: string;

    @Column({
        type: "bigint"
    })
    address_id: number;

    @ManyToOne(type => Customer, customer => customer.bills)
    @JoinColumn({name: 'customer_id'})
    customer: Customer

    @Column({
        type: "enum",
        enum: BillStatus,
        default: BillStatus.WAITING
    })
    status: BillStatus

    @OneToMany(() => BillDetail, billDetail => billDetail.bill, {
        eager: true,
        cascade: true
    })
    bill_details: BillDetail[]

    total_details: number;

    @AfterLoad()
    updateTotalDetails() {
        if (this.bill_details && this.bill_details.length > 0) {
            this.total_details = this.bill_details.map(billDetail => billDetail.quantity * billDetail.unit_price).reduce((a, b) => a + b, 0);
        }
    }

    @Column({
        type: "enum",
        enum: Payment,
        default: Payment.CASH
    })
    payment: Payment

    @Column({
        nullable: true,
        type: "bigint"
    })
    bank_id: number

    @ManyToMany(type => VoucherProfile, voucherProfile => voucherProfile.used_on_bill, {
        cascade: true
    })
    @JoinTable({
        name: "join_bill_voucher_profile",
        joinColumn: {
            name: "bill_id",
            referencedColumnName: "id"
        },
        inverseJoinColumn: {
            name: "voucher_profile_id",
            referencedColumnName: "id"
        }
    })
    used_vouchers: VoucherProfile[];

}

@Entity()
export class BillDetail {

    @PrimaryColumn()
    bill_id: number;

    @PrimaryColumn()
    book_id: string;

    @ManyToOne(() => Product, product => product.bill_details)
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

    @ManyToOne(type => Bill, bill => bill.bill_details)
    @JoinColumn({
        name: "bill_id"
    })
    bill: Bill

}
