import {NextFunction, Request, Response} from "express"
import {ProviderRepository} from "../repositories/provider.repository";

export class ProviderController {

    static async all(req: Request, res: Response, next: NextFunction) {
        return res.json(await ProviderRepository.search(req.query.select as any, req.query.skip as any, req.query.limit as any));
    }

    static async one(req: Request, res: Response, next: NextFunction) {
        return res.json(await ProviderRepository.findOneBy({
            id: +req.params.id
        }));
    }

    static async create(req: Request, res: Response, next: NextFunction) {
        const publisher = ProviderRepository.create(req.body);
        return res.json(await ProviderRepository.save(publisher));
    }

    static async update(req: Request, res: Response, next: NextFunction) {
        const entity = await ProviderRepository.findOne({
            where: {
                id: +req.params.id
            }
        });
        if (!entity) {
            return res.status(404).json({
                message: "Entity not found"
            });
        }
        const result = ProviderRepository.merge(entity, req.body);
        return res.json(await ProviderRepository.save(result));
    }

    static async delete(req: Request, res: Response, next: NextFunction) {
        const publisher = await ProviderRepository.findOneBy({
            id: +req.params.id
        });
        if (!publisher) {
            return res.status(404).json({
                message: "Author not found"
            });
        }
        await ProviderRepository.delete({
            id: +req.params.id
        });
        return res.status(204).json();
    }

}
