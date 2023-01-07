import { OrderItem } from '../models/order';
import {AppDataSource} from "../config/database";
import {Order} from "../models/order";
import {SelectQueryBuilder} from "typeorm";
import {ProductRepository} from "./product.repository";

export const OrderItemRepository = AppDataSource.getRepository(OrderItem);

export const OrderRepository = AppDataSource.getRepository(Order).extend({
    search(select?: string[], skip?: number, limit?: number, decorator?: Function) {
        const query: SelectQueryBuilder<Order> = this.createQueryBuilder("bill");
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
    createQuery(): SelectQueryBuilder<Order> {
        let query: SelectQueryBuilder<Order> = this.createQueryBuilder("order");

        //Join with order item
        query = query.leftJoinAndSelect("order.items", "order_items");

        //Join with product of item
        query = query.leftJoinAndSelect("order_items.product", "product");

        //Join with customer
        query = query.leftJoinAndSelect("order.customer", "customer");

        //Join with applied voucher
        query = query.leftJoinAndSelect("order.used_vouchers", "used_vouchers");

        //Join with voucher type
        query = query.leftJoinAndSelect("used_vouchers.voucher_type", "voucher_type");

        return query;
    }
});
