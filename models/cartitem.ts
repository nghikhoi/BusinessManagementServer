import {Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryColumn} from "typeorm";
import {User} from "./user";
import {Book} from "./book";

@Entity()
export class CartItem {

    @PrimaryColumn()
    user_id: string

    @PrimaryColumn()
    book_id: string

    @ManyToOne(type => User, user => user.cart_items)
    @JoinColumn({name: 'user_id'})
    user: User

    @ManyToOne(type => Book, book => book.cart_items)
    @JoinColumn({name: 'book_id'})
    book: Book

    @Column({
        default: 1
    })
    quantity: number

    @Column({
        default: true
    })
    selected: boolean

}
