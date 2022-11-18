import { ProductRepository } from './../repositories/product.repository';
import {NextFunction, Request, Response} from "express"
import {FeedbackRepository} from "../repositories/feedback.repository";

export class ProductController {

    static async getFeedback(req: Request, res: Response, next: NextFunction) {
        return res.json(await FeedbackRepository.find({
            where: {
                id: req.params.product_id
            }
        }));
    }

    static async search(request: Request, response: Response, next: NextFunction) {
        if (request.params.search) {
        }
        const query = request.query;
        return response.json(await ProductRepository.search(query.select as string[], query.skip as any, query.limit as any, query.search as any, query.search_by as any));
    }

    static async createOrUpdate(request: Request, response: Response, next: NextFunction) {
        let product;
        if (request.params.id) {
            product = await ProductRepository.findOne({
                where: {
                    id: +request.params.id
                }
            });
            ProductRepository.merge(product, request.body);
        } else {
            product = ProductRepository.create(request.body);
        }
        return response.json(await ProductRepository.save(product));
    }

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

    static async recommend(request: Request, response: Response, next: NextFunction) { //TODO
        if (request.params.search) {

        }
        return response.json(await ProductRepository.search(request.query.select as string[], request.query.skip as any, request.query.limit as any));
    }

    static async getProduct(request: Request, response: Response, next: NextFunction) {
        return response.json(await ProductRepository.findOne({
            where: {
                id: +request.params.product_id
            }
        }));
    }

}
