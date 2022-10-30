import {Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne, JoinColumn, CreateDateColumn} from "typeorm";
import {Book} from "./book";
import {Image} from "./file";

@Entity()
export class Author {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        nullable: false
    })
    name: string;

    @Column({
        nullable: true
    })
    description: string;

    @OneToMany(() => Book, book => book.author)
    books: Book[];

    @Column({
        nullable: true
    })
    avatar_id: string

    @OneToOne(type => Image, image => image.author)
    @JoinColumn({name: 'avatar_id'})
    avatar: Image

    @CreateDateColumn()
    createdAt: Date

}
