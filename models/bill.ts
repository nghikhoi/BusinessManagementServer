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
        nullable: true
    })
    bank: string

    @ManyToMany(type => Voucher, voucherProfile => voucherProfile.used_on_bill, {
        cascade: true
    })
    @JoinTable({
        name: "join_bill_voucher_profile",
        joinColumn: {
            name: "bill_id",
            referencedColumnName: "id"
        },
        inverseJoinColumn: {
            name: "voucher_code",
            referencedColumnName: "code"
        }
    })
    used_vouchers: Voucher[];

}

@Entity()
export class BillDetail {

    @PrimaryColumn()
    bill_id: number;

    @PrimaryColumn()
    product_id: number;

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
