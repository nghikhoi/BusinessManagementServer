import {ChildEntity, Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn, TableInheritance} from "typeorm";

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
}

@Entity()
export class Video extends Media {
    @Column()
    duration: number;
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
