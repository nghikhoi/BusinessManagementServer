import {NextFunction, Request, Response} from "express"
import { PermissionRepository } from '../repositories/position.repository';

export class PermissionController {

    static async getAll(request: Request, response: Response, next: NextFunction) {
        return response.json(await PermissionRepository.find());
    }

    static async getOne(request: Request, response: Response, next: NextFunction) {
        return response.json(await PermissionRepository.findOneBy({
            id: +request.params.permission_id
        }));
    }

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

    static async save(request: Request, response: Response, next: NextFunction) {
        return PermissionRepository.save(request.body)
    }

    static async delete(request: Request, response: Response, next: NextFunction) {
        return PermissionRepository.delete(request.body)
    }

}