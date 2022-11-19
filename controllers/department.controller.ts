import {NextFunction, Request, Response} from "express"
import { DepartmentRepository } from './../repositories/department.repository';

export class DepartmentController {

    static async getAll(request: Request, response: Response, next: NextFunction) {
        return response.json(await DepartmentRepository.find());
    }

    static async getDepartment(request: Request, response: Response, next: NextFunction) {
        return response.json(await DepartmentRepository.findOneBy({
            id: +request.params.department_id
        }));
    }

    static async save(request: Request, response: Response, next: NextFunction) {
        return DepartmentRepository.save(request.body)
    }

    static async delete(request: Request, response: Response, next: NextFunction) {
        return DepartmentRepository.delete(request.body)
    }

}