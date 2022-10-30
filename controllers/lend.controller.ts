import {NextFunction, Request, Response} from "express"
import {LendRepository} from "../repositories/lend.repository";

export class LendController {

    static async getByUser(req: Request, res: Response, next: NextFunction) {
        return res.json(await LendRepository.find({
            where: {
                user_id: req.params.user_id
            }
        }));
    }

    static async getLend(req: Request, res: Response, next: NextFunction) {
        return res.json(await LendRepository.findOne({
            where: {
                id: req.params.lend_id
            }
        }));
    }

    static async getLends(req: Request, res: Response, next: NextFunction) {
        return res.json(await LendRepository.search(req.query.select as any, req.query.skip as any, req.query.limit as any));
    }

}
