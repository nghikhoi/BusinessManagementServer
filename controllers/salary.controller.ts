import {NextFunction, Request, Response} from "express"
import { SalaryRepository } from '../repositories/salary.repository';

export class SalaryController {

    static async search(request: Request, response: Response, next: NextFunction) {
        //TODO
    }

    static async save(request: Request, response: Response, next: NextFunction) {
        return SalaryRepository.save(request.body)
    }

    static async delete(request: Request, response: Response, next: NextFunction) {
        return SalaryRepository.delete(request.body)
    }

}