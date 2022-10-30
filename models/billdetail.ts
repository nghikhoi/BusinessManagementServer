import {Column, Entity, ManyToOne, OneToOne, PrimaryColumn} from "typeorm";
import {Book} from "./book";
import {JoinColumn} from "typeorm";
import {Bill} from "./bill";

@Entity()
export class BillDetail {

    @PrimaryColumn()
    bill_id: number;

    @PrimaryColumn()
    book_id: string;

    @ManyToOne(() => Book, book => book.bill_details)
    @JoinColumn({name: "book_id"})
    book: Book;

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
