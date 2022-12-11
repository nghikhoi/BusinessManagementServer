import {NextFunction, Request, Response} from "express"
import { ContractRepository } from '../repositories/contract.repository';

export class ContractController {

    static async getAll(request: Request, response: Response, next: NextFunction) {
        return response.json(await ContractRepository.find());
    }

    static async getContract(request: Request, response: Response, next: NextFunction) {
        return response.json(await ContractRepository.findOneBy({
            id: +request.params.contract_id
        }));
    }

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

    static async save(request: Request, response: Response, next: NextFunction) {
        return ContractRepository.save(request.body)
    }

    static async delete(request: Request, response: Response, next: NextFunction) {
        return ContractRepository.delete(request.body)
    }

}