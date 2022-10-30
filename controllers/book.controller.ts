import {NextFunction, Request, Response} from "express"
import {BookRepository} from "../repositories/book.repository";
import {FeedbackRepository} from "../repositories/feedback.repository";

export class BookController {

    static async getFeedback(req: Request, res: Response, next: NextFunction) {
        return res.json(await FeedbackRepository.find({
            where: {
                id: req.params.book_id
            }
        }));
    }

    static async search(request: Request, response: Response, next: NextFunction) {
        if (request.params.search) {
            //TODO: return BookRepository.searchByUser(request.params.search, request.query.select, request.query.skip, request.query.limit);
        }
        const query = request.query;
        return response.json(await BookRepository.search(query.select as string[], query.skip as any, query.limit as any, query.search as any, query.search_by as any));
    }

    static async createOrUpdate(request: Request, response: Response, next: NextFunction) {
        let book;
        if (request.params.id) {
            book = await BookRepository.findOne({
                where: {
                    id: request.params.id
                }
            });
            BookRepository.merge(book, request.body);
        } else {
            book = BookRepository.create(request.body);
        }
        return response.json(await BookRepository.save(book));
    }

    static async delete(request: Request, response: Response, next: NextFunction) {
        const book = await BookRepository.findOne({
            where: {
                id: request.params.id
            }
        });
        if (!book) {
            return response.status(404).json({
                message: "Book not found"
            });
        }
        await BookRepository.delete({
            id: request.params.id
        });
        return response.json(book);
    }

    static async recommend(request: Request, response: Response, next: NextFunction) { //TODO
        if (request.params.search) {

        }
        return response.json(await BookRepository.search(request.query.select as string[], request.query.skip as any, request.query.limit as any));
    }

    static async getBook(request: Request, response: Response, next: NextFunction) {
        return response.json(await BookRepository.findOne({
            where: {
                id: request.params.book_id
            }
        }));
    }

}
