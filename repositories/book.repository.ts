import {AppDataSource} from "../config/database";
import {Book} from "../models/book";
import {SelectQueryBuilder} from "typeorm";
import {Image} from "../models/file";
import Fuse from "fuse.js";

export const BookRepository = AppDataSource.getRepository(Book).extend({
    async search(select?: string[], skip?: number, limit?: number, search?: string, search_by?: string, decorator?: Function) {
        let query: SelectQueryBuilder<Book> = this.createQueryBuilder("book");
        if (select) {
            query = query.select(select.map(item => "book." + item));
        }
        if (skip) {
            query = query.skip(skip)
        }
        if (limit) {
            query = query.limit(limit)
        }
        const temp = decorator ? decorator(query) : query;
        const result = temp.leftJoinAndSelect("book.images", "images").getMany();
        if (search) {
            const search_key = !search_by ? "title" : search_by;

            const options = {
                includeScore: true,
                keys: [search_key]
            }

            const fuse = new Fuse(await result, options)

            const search_result = fuse.search(search);
            return search_result.map(item => item.item);
        }
        return result;
    },
    increaseQuantity(book_id: string, quantity: number) {
        return this.createQueryBuilder("book")
            .update()
            .set({ quantity: () => `quantity + ${quantity}` })
            .where("book.id = :id", {id: book_id})
            .execute();
    },
    decreaseQuantity(book_id: string, quantity: number) {
        return this.createQueryBuilder("book")
            .update()
            .set({ quantity: () => `quantity - ${quantity}` })
            .where("book.id = :id", {id: book_id})
            .execute();
    }
});
