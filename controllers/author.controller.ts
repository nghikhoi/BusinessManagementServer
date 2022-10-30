import {NextFunction, Request, Response} from "express"
import {AuthorRepository} from "../repositories/author.repository";

export class AuthorController {

    static async all(req: Request, res: Response, next: NextFunction) {
        return res.json(await AuthorRepository.search(req.query.select as any, req.query.skip as any, req.query.limit as any));
    }

    static async one(req: Request, res: Response, next: NextFunction) {
        return res.json(await AuthorRepository.findOneBy({
            id: +req.params.id
        }));
    }

    static async create(req: Request, res: Response, next: NextFunction) {
        const author = AuthorRepository.create(req.body);
        return res.json(await AuthorRepository.save(author));
    }

    static async update(req: Request, res: Response, next: NextFunction) {
        const author = await AuthorRepository.findOneBy({
            id: +req.params.id
        });
        if (!author) {
            return res.status(404).json({
                message: "Author not found"
            });
        }
        AuthorRepository.merge(author, req.body);
        return res.json(await AuthorRepository.save(author));
    }

    static async delete(req: Request, res: Response, next: NextFunction) {
        const author = await AuthorRepository.findOneBy({
            id: +req.params.id
        });
        if (!author) {
            return res.status(404).json({
                message: "Author not found"
            });
        }
        await AuthorRepository.delete({
            id: +req.params.id
        });
        return res.status(204).json();
    }

}
