import {AppDataSource} from "../config/database";
import {StorageAction, StorageLog, StorageLogDetail} from "../models/storagelog";
import {SelectQueryBuilder} from "typeorm";

export const StorageLogDetailRepository = AppDataSource.getRepository(StorageLogDetail);

export const StorageLogRepository = AppDataSource.getRepository(StorageLog).extend({
    search(select?: string[], skip?: number, limit?: number, decorator?: Function) {
        const query: SelectQueryBuilder<StorageLog> = this.createQueryBuilder("storage");
        if (select) {
            query.select(select.map(item => "storage." + item));
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
        return query.leftJoinAndSelect('details', 'details').getMany();
    },
    searchByAction(action: StorageAction, select?: string[], skip?: number, limit?: number, decorator?: Function) {
        return this.search(select, skip, limit, (query) => {
            return query.where("storage.action = :action", {action: action});
        });
    },
});