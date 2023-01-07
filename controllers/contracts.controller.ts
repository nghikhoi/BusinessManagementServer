import {NextFunction, Request, Response} from "express";
import {ContractRepository} from "../repositories/contract.repository";

export class ContractController {

    static async getContracts(req: Request, res: Response, next: NextFunction) {
        const result = await ContractRepository.find({
            relations: ["type"]
        });
        return res.json(result);
    }

    static async getContract(req: Request, res: Response, next: NextFunction) {
        const id = +req.params.id;
        return res.json(await this.getContractById(id));
    }

    static async getContractById(id: number) {
        return await ContractRepository.findOne({
            where: {
                id: id
            },
            relations: ["type"]
        });
    }
}
