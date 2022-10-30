import {AppDataSource} from "../config/database";
import {Author} from "../models/author";
import {SelectQueryBuilder} from "typeorm";

export const AuthorRepository = AppDataSource.getRepository(Author).extend({
    search(select?: string[], skip?: number, limit?: number, decorator?: Function) {
        const query: SelectQueryBuilder<Author> = this.createQueryBuilder("author");
        if (select) {
            query.select(select.map(item => "author." + item));
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