import {AppDataSource} from "../config/database";
import {Bill} from "../models/bill";
import {CartItemRepository} from "./caritem.repository";
import {CartItem} from "../models/cartitem";
import {BillStatus} from "../models/billstatus";
import {BillDetail} from "../models/billdetail";
import {SelectQueryBuilder} from "typeorm";
import {BookRepository} from "./book.repository";

export const BillDetailRepository = AppDataSource.getRepository(BillDetail);

export const BillRepository = AppDataSource.getRepository(Bill).extend({
    search(select?: string[], skip?: number, limit?: number, decorator?: Function) {
        const query: SelectQueryBuilder<Bill> = this.createQueryBuilder("bill");
        if (select) {
            query.select(select.map(item => "bill." + item));
        }
        if (skip) {
            query.skip(skip)
        }
        if (limit) {
            query.limit(limit)
        }
        const temp = decorator ? decorator(query) : query;
        return temp.leftJoinAndSelect("bill.bill_details", "bill_details").getMany();
    },
    async createFrom(user_id: string, items: any[]) {
        const bill: Bill = this.create({
            user_id: user_id,
            status: BillStatus.WAITING
        });

        bill.bill_details = await Promise.all(items.map(async item => {
            const book = item.book != null ? item.book : await BookRepository.findOne({
                where: {
                    id: item.book_id
                }
            });
            return BillDetailRepository.create({
                bill_id: bill.id,
                book_id: item.book_id,
                quantity: item.quantity,
                unit_price: book.price
            });
        }));

        return bill;
    },
    async createFromCart(user_id: string) {
        const items: CartItem[] = await CartItemRepository.findByUser(user_id, true);
        return this.createFrom(user_id, items);
    }
});
