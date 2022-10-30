import {AppDataSource} from "../config/database";
import {Lend} from "../models/lend";
import {BillStatus} from "../models/billstatus";
import {Book} from "../models/book";
import {BookRepository} from "./book.repository";
import {SelectQueryBuilder} from "typeorm";

export const LendRepository = AppDataSource.getRepository(Lend).extend({
    search(select?: string[], skip?: number, limit?: number, decorator?: Function) {
        const query: SelectQueryBuilder<Lend> = this.createQueryBuilder("lend");
        if (select) {
            query.select(select.map(item => "lend." + item));
        }
        if (skip) {
            query.skip(skip)
        }
        if (limit) {
            query.limit(limit)
        }
        if (decorator) {
            return decorator(query).getMany();
        }
        return query.getMany();
    },
    async lend(user_id: string, book_ids: string[], end_date: Date) {
        const books: Book[] = await Promise.all(book_ids.map(id => BookRepository.findOne({
            where: {
                id: id
            }
        })));
        /*const lend: Lend = this.create({
            user_id: user_id,
            status: BillStatus.WAITING,
            start_date: new Date(),
            end_date: end_date,
        });
        lend.details = books.map(book => {
            return LendDetailRepository.create({
                lend_id: lend.id,
                book_id: book.id,
                unit_price: book.price
            });
        });
        return await this.save(lend);*/
        return await Promise.all(books.map(book => {
            const lend = this.create({
                user_id: user_id,
                status: BillStatus.WAITING,
                start_date: new Date(),
                end_date: end_date,
                book_id: book.id,
                unit_price: book.price
            });
            return this.save(lend);
        }));
    },
});
