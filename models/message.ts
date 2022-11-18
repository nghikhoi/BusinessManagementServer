import { Product } from './product';
import { Customer } from './customer';
import {
    ChildEntity,
    Column, CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    TableInheritance
} from "typeorm";
import {Image, Video} from "./file";

@Entity()
@TableInheritance({column: {type: "varchar", name: "type"}})
export class Message {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    user_id: string;

    @ManyToOne(type => Customer, user => user.messages)
    @JoinColumn({name: 'user_id'})
    customer: Customer;

    @Column({
        nullable: true
    })
    text: string;

    @OneToMany(type => Image, image => image.message, {
        cascade: true,
        eager: true
    })
    images: Image[]

    @OneToMany(type => Video, video => video.message, {
        cascade: true,
        eager: true
    })
    videos: Video[]

    @CreateDateColumn()
    created_at: Date;

}

@ChildEntity()
export class Feedback extends Message {

    @OneToMany(type => ReplyFeedback, message => message.feedback, {
        eager: true,
        cascade: true
    })
    replies: ReplyFeedback[]

    @Column()
    product_id: string;

    @ManyToOne(type => Product, product => product.feedbacks)
    @JoinColumn({name: 'product_id'})
    product: Product

    @Column({
        type: "double"
    })
    rating: number;

}

@ChildEntity()
export class ReplyFeedback extends Message {

    @Column()
    feedback_id: string;

    @ManyToOne(type => Feedback, mainMessage => mainMessage.replies)
    @JoinColumn({name: 'feedback_id'})
    feedback: Feedback;

}
