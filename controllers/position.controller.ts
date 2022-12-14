import {NextFunction, Request, Response} from "express"
import { PositionRepository } from '../repositories/position.repository';
import { PermissionRequire } from "./authorize.controller";

export class PositionController {

    @PermissionRequire("data.bill.get")
    static async getAll(request: Request, response: Response, next: NextFunction) {
        return response.json(await PositionRepository.find());
    }

    @PermissionRequire("data.bill.get")
    static async getOne(request: Request, response: Response, next: NextFunction) {
        return response.json(await PositionRepository.findOneBy({
            id: +request.params.position_id
        }));
    }

    @PermissionRequire("data.bill.get")
    static async update(req: Request, res: Response, next: NextFunction) {
        const entity = await PositionRepository.findOne({
            where: {
                id: +req.params.bill_id
            }
        });
        if (!entity) {
            return res.status(404).json({
                message: "Entity not found"
            });
        }
        const result = PositionRepository.merge(entity, req.body);
        return res.json(await PositionRepository.save(result));
    }

    @PermissionRequire("data.bill.get")
    static async save(request: Request, response: Response, next: NextFunction) {
        return PositionRepository.save(request.body)
    }

    @PermissionRequire("data.bill.get")
    static async delete(request: Request, response: Response, next: NextFunction) {
        return PositionRepository.delete(request.body)
    }

}