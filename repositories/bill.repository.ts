import { BillStatus, BillDetail } from './../models/bill';
import {AppDataSource} from "../config/database";
import {Bill} from "../models/bill";
import {SelectQueryBuilder} from "typeorm";
import {ProductRepository} from "./product.repository";

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
    }
});
