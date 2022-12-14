import { ProductRepository } from './../repositories/product.repository';
import {NextFunction, Request, Response} from "express"
import {FeedbackRepository} from "../repositories/feedback.repository";
import { PermissionRequire } from './authorize.controller';

export class ProductController {

    @PermissionRequire("data.product.get")
    static async getFeedback(req: Request, res: Response, next: NextFunction) {
        return res.json(await FeedbackRepository.find({
            where: {
                id: req.params.product_id
            }
        }));
    }

    @PermissionRequire("data.product.get")
    static async search(request: Request, response: Response, next: NextFunction) {
        if (request.params.search) {
        }
        const query = request.query;
        return response.json(await ProductRepository.search(query.select as string[], query.skip as any, query.limit as any, query.search as any, query.search_by as any));
    }

    @PermissionRequire("data.product.get")
    static async update(req: Request, res: Response, next: NextFunction) {
        const entity = await ProductRepository.findOne({
            where: {
                id: +req.params.product_id
            }
        });
        if (!entity) {
            return res.status(404).json({
                message: "Entity not found"
            });
        }
        const result = ProductRepository.merge(entity, req.body);
        return res.json(await ProductRepository.save(result));
    }

    @PermissionRequire("data.product.get")
    static async save(request: Request, response: Response, next: NextFunction) {
        return ProductRepository.save(request.body)
    }

    @PermissionRequire("data.product.get")
    static async delete(request: Request, response: Response, next: NextFunction) {
        const product = await ProductRepository.findOne({
            where: {
                id: +request.params.id
            }
        });
        if (!product) {
            return response.status(404).json({
                message: "Book not found"
            });
        }
        await ProductRepository.delete({
            id: +request.params.id
        });
        return response.json(product);
    }

    @PermissionRequire("data.product.get")
    static async recommend(request: Request, response: Response, next: NextFunction) { //TODO
        if (request.params.search) {

        }
        return response.json(await ProductRepository.search(request.query.select as string[], request.query.skip as any, request.query.limit as any));
    }

    @PermissionRequire("data.product.get")
    static async getProduct(request: Request, response: Response, next: NextFunction) {
        return response.json(await ProductRepository.findOne({
            where: {
                id: +request.params.product_id
            }
        }));
    }

}
