import {AppDataSource} from "../config/database";
import {SelectQueryBuilder} from "typeorm";
import {Transporter} from "../models/transporter";

export const TransporterRepository = AppDataSource.getRepository(Transporter).extend({
    search(select?: string[], skip?: number, limit?: number, decorator?: Function) {
        const query: SelectQueryBuilder<Transporter> = this.createQueryBuilder("publisher");
        if (select) {
            query.select(select.map(item => "publisher." + item));
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
    }
});