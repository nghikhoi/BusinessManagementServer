import { CustomerRepository } from './../repositories/customer.repository';
import {NextFunction, Request, Response} from "express";
import { PermissionRequire } from './authorize.controller';

export class CustomerController {

    @PermissionRequire("data.customer.get")
    static async getAll(request: Request, response: Response, next: NextFunction) {
        return response.json(await CustomerRepository.find());
    }

    @PermissionRequire("data.customer.get")
    static async getCustomer(request: Request, response: Response, next: NextFunction) {
        return response.json(await CustomerRepository.findOneBy({
            id: request.params.customer_id
        }));
    }

    @PermissionRequire("data.customer.get")
    static async update(req: Request, res: Response, next: NextFunction) {
        const entity = await CustomerRepository.findOne({
            where: {
                id: req.params.id
            }
        });
        if (!entity) {
            return res.status(404).json({
                message: "Entity not found"
            });
        }
        const result = CustomerRepository.merge(entity, req.body);
        return res.json(await CustomerRepository.save(result));
    }

    @PermissionRequire("data.customer.get")
    static async save(request: Request, response: Response, next: NextFunction) {
        return CustomerRepository.save(request.body)
    }

    @PermissionRequire("data.customer.get")
    static async delete(request: Request, response: Response, next: NextFunction) {
        return CustomerRepository.delete(request.body)
    }

}