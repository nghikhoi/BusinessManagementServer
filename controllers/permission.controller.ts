import {NextFunction, Request, Response} from "express"
import { PermissionRepository } from '../repositories/position.repository';
import { PermissionRequire } from "./authorize.controller";

export class PermissionController {

    @PermissionRequire("data.bill.get")
    static async getAll(request: Request, response: Response, next: NextFunction) {
        return response.json(await PermissionRepository.find());
    }

    @PermissionRequire("data.bill.get")
    static async getOne(request: Request, response: Response, next: NextFunction) {
        return response.json(await PermissionRepository.findOneBy({
            id: +request.params.permission_id
        }));
    }

    @PermissionRequire("data.bill.get")
    static async update(req: Request, res: Response, next: NextFunction) {
        const entity = await PermissionRepository.findOne({
            where: {
                id: +req.params.id
            }
        });
        if (!entity) {
            return res.status(404).json({
                message: "Entity not found"
            });
        }
        const result = PermissionRepository.merge(entity, req.body);
        return res.json(await PermissionRepository.save(result));
    }

    @PermissionRequire("data.bill.get")
    static async save(request: Request, response: Response, next: NextFunction) {
        return PermissionRepository.save(request.body)
    }

    @PermissionRequire("data.bill.get")
    static async delete(request: Request, response: Response, next: NextFunction) {
        return PermissionRepository.delete(request.body)
    }

}