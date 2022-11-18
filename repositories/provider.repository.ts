import { Provider } from '../models/provider';
import {AppDataSource} from "../config/database";
import {SelectQueryBuilder} from "typeorm";

export const ProviderRepository = AppDataSource.getRepository(Provider).extend({
    search(select?: string[], skip?: number, limit?: number, decorator?: Function) {
        const query: SelectQueryBuilder<Provider> = this.createQueryBuilder("provider");
        if (select) {
            query.select(select.map(item => "provider." + item));
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