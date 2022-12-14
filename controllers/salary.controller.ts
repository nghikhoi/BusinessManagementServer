import {NextFunction, Request, Response} from "express"
import { SalaryRepository } from '../repositories/salary.repository';
import { PermissionRequire } from "./authorize.controller";

export class SalaryController {

    @PermissionRequire("data.salary.get")
    static async search(request: Request, response: Response, next: NextFunction) {
        //TODO
    }

    @PermissionRequire("data.salary.get")
    static async save(request: Request, response: Response, next: NextFunction) {
        return SalaryRepository.save(request.body)
    }

    @PermissionRequire("data.salary.get")
    static async update(req: Request, res: Response, next: NextFunction) {
        const entity = await SalaryRepository.findOne({
            where: {
                employee_id: req.params.id,
                month: +req.params.month,
                year: +req.params.year
            }
        });
        if (!entity) {
            return res.status(404).json({
                message: "Entity not found"
            });
        }
        const result = SalaryRepository.merge(entity, req.body);
        return res.json(await SalaryRepository.save(result));
    }

    @PermissionRequire("data.salary.get")
    static async delete(request: Request, response: Response, next: NextFunction) {
        return SalaryRepository.delete(request.body)
    }

}