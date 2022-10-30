import {AppDataSource} from "../config/database";
import {CartItem} from "../models/cartitem";
import {SelectQueryBuilder} from "typeorm";

export const InteractProperties = [
    'quantity',
    'selected'
];

export const CartItemRepository = AppDataSource.getRepository(CartItem).extend({
    findByUser(user_id: string, selected?: boolean, eager?: boolean): Promise<CartItem[]> {
        let query: SelectQueryBuilder<CartItem> = this.createQueryBuilder('cart_item')
            .where('cart_item.user_id = :user_id', {user_id});
        if (selected != null) {
            query = query.andWhere('cart_item.selected = :selected', {selected});
        }
        if (eager != null && eager) {
            query = query.innerJoinAndSelect('cart_item.book', 'book');
        }
        return query.getMany();
    },
    removeSelected(user_id: string): Promise<void> {
        return this.createQueryBuilder('cart_item')
            .where('cart_item.user_id = :user_id', {user_id})
            .andWhere('cart_item.selected = true')
            .delete()
            .execute();
    },
    removeAll(user_id: string, book_ids: string[]) {
        return Promise.all(book_ids.map(book_id => CartItemRepository.delete({
            user_id: user_id,
            book_id: book_id
        })));
    }
});