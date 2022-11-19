import { CustomerRepository } from './../repositories/customer.repository';
import {NextFunction, Request, Response} from "express";

export class CustomerController {

    static async getAll(request: Request, response: Response, next: NextFunction) {
        return response.json(await CustomerRepository.find());
    }

    static async getDepartment(request: Request, response: Response, next: NextFunction) {
        return response.json(await CustomerRepository.findOneBy({
            id: request.params.customer_id
        }));
    }

    static async save(request: Request, response: Response, next: NextFunction) {
        return CustomerRepository.save(request.body)
    }

    static async delete(request: Request, response: Response, next: NextFunction) {
        return CustomerRepository.delete(request.body)
    }

}