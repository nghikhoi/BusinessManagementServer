import { Voucher, VoucherType } from './../models/voucher';
import {AppDataSource} from "../config/database";
import {SelectQueryBuilder} from "typeorm";

export const VoucherRepository = AppDataSource.getRepository(Voucher).extend({
    createQuery(): SelectQueryBuilder<Voucher> {
        let query: SelectQueryBuilder<Voucher> = this.createQueryBuilder("voucher");

        query = query.leftJoinAndSelect("voucher.voucher_type", "voucher_type")
            .leftJoinAndSelect("voucher.applied_products", "applied_products")
            .leftJoinAndSelect("voucher_type.require_product", "require_product");

        return query;
    }
});
export const VoucherTypeRepository = AppDataSource.getRepository(VoucherType);
