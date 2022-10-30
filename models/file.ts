import {ChildEntity, Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn, TableInheritance} from "typeorm";
import {Book} from "./book";
import {Message} from "./message";
import {User} from "./user";
import {Transporter} from "./transporter";
import {Publisher} from "./publisher";
import {Author} from "./author";

export abstract class File {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    name: string;

    @Column({
        nullable: true
    })
    path: string;
}

export abstract class Media extends File {

}

@Entity()
export class Image extends Media {
    @Column()
    width: number;

    @Column()
    height: number;

    @Column({
        nullable: true,
        type: "longblob",
        select: false
    })
    buffer: Buffer;

    @Column({
        nullable: true,
        default: 'image/*'
    })
    mimetype: string;

    @ManyToOne(type => Book, book => book.images)
    book: Book;

    @ManyToOne(type => Message, message => message.images)
    message: Message;

    @OneToOne(type => User, user => user.avatar)
    user: User;

    @OneToOne(type => Author, user => user.avatar)
    author: User;

    @OneToOne(type => Publisher, user => user.avatar)
    publisher: User;

    @OneToOne(type => Transporter, user => user.avatar)
    transporter: User;
}

@Entity()
export class Video extends Media {
    @Column()
    duration: number;

    @ManyToOne(type => Book, book => book.videos)
    book: Book;

    @ManyToOne(type => Message, message => message.videos)
    message: Message;
}

@Entity()
export class Audio extends Media {
    @Column()
    duration: number;
}

@Entity()
export class Document extends File {
    @Column()
    size: number;
}

@Entity()
export class Other extends File {
    @Column()
    size: number;
}
