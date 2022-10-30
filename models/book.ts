import {
    Column, CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    OneToOne,
    PrimaryColumn,
    PrimaryGeneratedColumn
} from "typeorm";
import {Author} from "./author";
import {Publisher} from "./publisher";
import {Document, Image, Video} from "./file";
import {Feedback} from "./message";
import {User} from "./user";
import {BookTag} from "./booktag";
import {BillDetail} from "./billdetail";
import {CartItem} from "./cartitem";

@Entity()
export class Book {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @CreateDateColumn()
    created_at: Date

    @Column()
    title: string

    @Column({
        type: "longtext",
        nullable: true
    })
    description: string

    @Column({
        nullable: true
    })
    isbn: string

    @Column({
        default: 0
    })
    stock: number

    @Column({
        type: "set",
        enum: BookTag,
        nullable: true
    })
    tags: BookTag[]

    @Column({
        nullable: true
    })
    author_id: number

    @ManyToOne(() => Author, author => author.books)
    @JoinColumn({name: "author_id"})
    author: Author

    @Column({
        type: "decimal"
    })
    price: number

    @Column({
        nullable: true
    })
    publisher_id: number

    @ManyToOne(() => Publisher, publisher => publisher.books)
    @JoinColumn({name: "publisher_id"})
    publisher: Publisher

    @OneToMany(() => Image, image => image.book, {
        eager: true
    })
    images: Image[]

    @OneToMany(() => Video, video => video.book, {
        eager: true
    })
    videos: Video[]

    @OneToOne(() => Document)
    ebook: Document

    @OneToMany(() => Feedback, feedback => feedback.book)
    feedbacks: Feedback[]

    @OneToMany(() => BillDetail, billDetail => billDetail.book)
    bill_details: BillDetail[]

    @OneToMany(() => CartItem, cart => cart.book)
    cart_items: CartItem[]

}

@Entity()
export class FavouriteBook {

    @ManyToOne(() => User, user => user.favourite_books)
    user: User

    @PrimaryColumn()
    user_id: string

    @ManyToOne(() => Book, {
        eager: true
    })
    @JoinColumn({name: "book_id"})
    book: Book

    @PrimaryColumn()
    book_id: string

}

@Entity()
export class RecentBook {

    @ManyToOne(() => User, user => user.favourite_books)
    user: User

    @PrimaryColumn()
    user_id: string

    @ManyToOne(() => Book, {
        eager: true
    })
    @JoinColumn({name: "book_id"})
    book: Book

    @PrimaryColumn()
    book_id: string

}

