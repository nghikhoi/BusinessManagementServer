import {NextFunction, Request, Response} from "express"
import { ContractRepository } from '../repositories/contract.repository';
import { PermissionRequire } from "./authorize.controller";

export class ContractController {

    @PermissionRequire("data.bill.get")
    static async getAll(request: Request, response: Response, next: NextFunction) {
        return response.json(await ContractRepository.find());
    }

    @PermissionRequire("data.bill.get")
    static async getContract(request: Request, response: Response, next: NextFunction) {
        return response.json(await ContractRepository.findOneBy({
            id: +request.params.contract_id
        }));
    }

    @PermissionRequire("data.bill.get")
    static async update(req: Request, res: Response, next: NextFunction) {
        const entity = await ContractRepository.findOne({
            where: {
                id: +req.params.id
            }
        });
        if (!entity) {
            return res.status(404).json({
                message: "Entity not found"
            });
        }
        const result = ContractRepository.merge(entity, req.body);
        return res.json(await ContractRepository.save(result));
    }

    @PermissionRequire("data.bill.get")
    static async save(request: Request, response: Response, next: NextFunction) {
        return ContractRepository.save(request.body)
    }

    @PermissionRequire("data.bill.get")
    static async delete(request: Request, response: Response, next: NextFunction) {
        return ContractRepository.delete(request.body)
    }

}