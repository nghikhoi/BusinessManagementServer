import {
    ChildEntity,
    Column,
    Entity,
    JoinColumn, JoinTable, ManyToMany,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    TableInheritance
} from "typeorm";
import {BookTag} from "./booktag";
import {User} from "./user";
import {Bill} from "./bill";
import {type} from "os";

export enum DiscountType {
    PERCENTAGE = 'PERCENTAGE',
    AMOUNT = 'AMOUNT'
}

@Entity()
export class VoucherProfile {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    name: string;

    @Column({
        nullable: true
    })
    description: string;

    @Column(
        {
            type: 'enum',
            enum: DiscountType,
            default: DiscountType.PERCENTAGE
        }
    )
    discount_type: DiscountType;

    @Column(
        {
            type: 'decimal',
        }
    )
    discount: number;

    @OneToMany(type => Voucher, voucher => voucher.profile)
    vouchers: Voucher[]

    @OneToMany(type => WildVoucher, voucher => voucher.profile)
    wild_vouchers: WildVoucher[]

    @Column({
        type: "set",
        enum: BookTag,
        nullable: true
    })
    require_book_tags: BookTag[]

    @Column({
        nullable: true
    })
    require_book_count: number;

    @Column({
        nullable: true
    })
    require_min_value: number;

    @ManyToMany(type => Bill, bill => bill.used_vouchers)
    used_on_bill: Bill[]

}

abstract class BaseVoucher {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    code: string;

    @Column()
    release_date: Date;

    @Column()
    expire_date: Date;

    @Column()
    profile_id: string;

}

@Entity()
export class Voucher extends BaseVoucher {

    @Column()
    user_id: string;

    @ManyToOne(type => User, user => user.vouchers)
    @JoinColumn({name: 'user_id'})
    user: User;

    @ManyToOne(type => VoucherProfile, voucherProfile => voucherProfile.vouchers, {
        eager: true
    })
    @JoinColumn({name: 'profile_id'})
    profile: VoucherProfile;

    @Column({
        nullable: true
    })
    used_at: Date;

}

@Entity()
export class WildVoucher extends BaseVoucher {

    @Column()
    remaining_uses: number;

    @Column()
    max_uses: number;

    @ManyToOne(type => VoucherProfile, voucherProfile => voucherProfile.wild_vouchers)
    @JoinColumn({name: 'profile_id'})
    profile: VoucherProfile;

}
