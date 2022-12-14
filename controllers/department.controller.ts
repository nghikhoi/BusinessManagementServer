import {NextFunction, Request, Response} from "express"
import { DepartmentRepository } from './../repositories/department.repository';
import { PermissionRequire } from "./authorize.controller";

export class DepartmentController {

    @PermissionRequire("data.bill.get")
    static async getAll(request: Request, response: Response, next: NextFunction) {
        return response.json(await DepartmentRepository.find());
    }

    @PermissionRequire("data.bill.get")
    static async getOne(request: Request, response: Response, next: NextFunction) {
        return response.json(await DepartmentRepository.findOneBy({
            id: +request.params.department_id
        }));
    }

    @PermissionRequire("data.bill.get")
    static async update(req: Request, res: Response, next: NextFunction) {
        const entity = await DepartmentRepository.findOne({
            where: {
                id: +req.params.id
            }
        });
        if (!entity) {
            return res.status(404).json({
                message: "Entity not found"
            });
        }
        const result = DepartmentRepository.merge(entity, req.body);
        return res.json(await DepartmentRepository.save(result));
    }

    @PermissionRequire("data.bill.get")
    static async save(request: Request, response: Response, next: NextFunction) {
        return DepartmentRepository.save(request.body)
    }

    @PermissionRequire("data.bill.get")
    static async delete(request: Request, response: Response, next: NextFunction) {
        return DepartmentRepository.delete(request.body)
    }

}