import {NextFunction, Request, Response} from "express"
import {TransporterRepository} from "../repositories/transporter.repository";

export class TransporterController {

    static async all(req: Request, res: Response, next: NextFunction) {
        return res.json(await TransporterRepository.search(req.query.select as any, req.query.skip as any, req.query.limit as any));
    }

    static async one(req: Request, res: Response, next: NextFunction) {
        return res.json(await TransporterRepository.findOneBy({
            id: +req.params.id
        }));
    }

    static async create(req: Request, res: Response, next: NextFunction) {
        const transporter = TransporterRepository.create(req.body);
        return res.json(await TransporterRepository.save(transporter));
    }

    static async update(req: Request, res: Response, next: NextFunction) {
        const transporter = await TransporterRepository.findOneBy({
            id: +req.params.id
        });
        if (!transporter) {
            return res.status(404).json({
                message: "Author not found"
            });
        }
        TransporterRepository.merge(transporter, req.body);
        return res.json(await TransporterRepository.save(transporter));
    }

    static async delete(req: Request, res: Response, next: NextFunction) {
        const transporter = await TransporterRepository.findOneBy({
            id: +req.params.id
        });
        if (!transporter) {
            return res.status(404).json({
                message: "Author not found"
            });
        }
        await TransporterRepository.delete({
            id: +req.params.id
        });
        return res.status(204).json();
    }

}
