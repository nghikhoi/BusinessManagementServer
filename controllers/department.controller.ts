import {NextFunction, Request, Response} from "express"
import { DepartmentRepository } from './../repositories/department.repository';

export class DepartmentController {

    static async getAll(request: Request, response: Response, next: NextFunction) {
        return response.json(await DepartmentRepository.find());
    }

    static async getOne(request: Request, response: Response, next: NextFunction) {
        return response.json(await DepartmentRepository.findOneBy({
            id: +request.params.department_id
        }));
    }

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

    static async save(request: Request, response: Response, next: NextFunction) {
        return DepartmentRepository.save(request.body)
    }

    static async delete(request: Request, response: Response, next: NextFunction) {
        return DepartmentRepository.delete(request.body)
    }

}