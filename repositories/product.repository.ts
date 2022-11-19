import { ProductCategory } from './../models/product';
import {AppDataSource} from "../config/database";
import {Product} from "../models/product";
import {SelectQueryBuilder} from "typeorm";
import {Image} from "../models/file";
import Fuse from "fuse.js";

export const ProductCategoryRepository = AppDataSource.getRepository(ProductCategory);

export const ProductRepository = AppDataSource.getRepository(Product).extend({
    async search(select?: string[], skip?: number, limit?: number, search?: string, search_by?: string, decorator?: Function) {
        let query: SelectQueryBuilder<Product> = this.createQueryBuilder("product");
        if (select) {
            query = query.select(select.map(item => "product." + item));
        }
        if (skip) {
            query = query.skip(skip)
        }
        if (limit) {
            query = query.limit(limit)
        }
        const temp = decorator ? decorator(query) : query;
        const result = temp.leftJoinAndSelect("product.images", "images").getMany();
        if (search) {
            const search_key = !search_by ? "name" : search_by;

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
    increaseQuantity(product_id: string, quantity: number) {
        return this.createQueryBuilder("product")
            .update()
            .set({ quantity: () => `quantity + ${quantity}` })
            .where("product.id = :id", {id: product_id})
            .execute();
    },
    decreaseQuantity(product_id: string, quantity: number) {
        return this.createQueryBuilder("product")
            .update()
            .set({ quantity: () => `quantity - ${quantity}` })
            .where("product.id = :id", {id: product_id})
            .execute();
    }
});
