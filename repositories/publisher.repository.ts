import {AppDataSource} from "../config/database";
import {Publisher} from "../models/provider";
import {SelectQueryBuilder} from "typeorm";

export const PublisherRepository = AppDataSource.getRepository(Publisher).extend({
    search(select?: string[], skip?: number, limit?: number, decorator?: Function) {
        const query: SelectQueryBuilder<Publisher> = this.createQueryBuilder("publisher");
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