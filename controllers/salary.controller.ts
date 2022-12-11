import {NextFunction, Request, Response} from "express"
import { SalaryRepository } from '../repositories/salary.repository';

export class SalaryController {

    static async search(request: Request, response: Response, next: NextFunction) {
        //TODO
    }

    static async save(request: Request, response: Response, next: NextFunction) {
        return SalaryRepository.save(request.body)
    }

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

    static async delete(request: Request, response: Response, next: NextFunction) {
        return SalaryRepository.delete(request.body)
    }

}