import {NextFunction, Request, Response} from "express"
import {PublisherRepository} from "../repositories/publisher.repository";

export class PublisherController {

    static async all(req: Request, res: Response, next: NextFunction) {
        return res.json(await PublisherRepository.search(req.query.select as any, req.query.skip as any, req.query.limit as any));
    }

    static async one(req: Request, res: Response, next: NextFunction) {
        return res.json(await PublisherRepository.findOneBy({
            id: +req.params.id
        }));
    }

    static async create(req: Request, res: Response, next: NextFunction) {
        const publisher = PublisherRepository.create(req.body);
        return res.json(await PublisherRepository.save(publisher));
    }

    static async update(req: Request, res: Response, next: NextFunction) {
        const publisher = await PublisherRepository.findOneBy({
            id: +req.params.id
        });
        if (!publisher) {
            return res.status(404).json({
                message: "Author not found"
            });
        }
        PublisherRepository.merge(publisher, req.body);
        return res.json(await PublisherRepository.save(publisher));
    }

    static async delete(req: Request, res: Response, next: NextFunction) {
        const publisher = await PublisherRepository.findOneBy({
            id: +req.params.id
        });
        if (!publisher) {
            return res.status(404).json({
                message: "Author not found"
            });
        }
        await PublisherRepository.delete({
            id: +req.params.id
        });
        return res.status(204).json();
    }

}
