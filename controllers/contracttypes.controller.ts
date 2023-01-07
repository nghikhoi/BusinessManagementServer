import {NextFunction, Request, Response} from "express";
import {OrderItemRepository} from "../repositories/bill.repository";
import {ContractRepository, ContractTypeRepository} from "../repositories/contract.repository";
import {CustomerRepository} from "../repositories/customer.repository";
import {DepartmentRepository} from "../repositories/department.repository";
import {ImageRepository, VideoRepository} from "../repositories/file.repository";
import {EmployeeRepository, SkillRepository} from "../repositories/employee.repository";
import {PositionRepository} from "../repositories/position.repository";
import {ProductCategoryRepository, ProductRepository} from "../repositories/product.repository";
import {ProviderRepository} from "../repositories/provider.repository";
import {SkillTypeRepository} from "../repositories/skill.repository";
import {
    OvertimeRecordRepository,
    PositionRecordRepository,
    SalaryRecordRepository
} from "../repositories/salary.repository";
import {VoucherRepository, VoucherTypeRepository} from "../repositories/voucher.repository";
import {BonusRecordRepository, BonusTypeRepository} from "../repositories/bonus.repository";

export class ContractTypesController {

    static async getContractTypes(req: Request, res: Response, next: NextFunction) {
        const result = await ContractTypeRepository.find();
        return res.json(result);
    }

    static async getContractType(req: Request, res: Response, next: NextFunction) {
        const id: number = +req.params.id;
        const result = await ContractTypeRepository.findOne({
            where: {
                id: id
            }
        });
        return res.json(result);
    }

    static async addContractType(req: Request, res: Response, next: NextFunction) {
        const contractType: any /*ContractType*/ = req.body;
        const result = await ContractTypeRepository.save(contractType);
        return res.json(result);
    }

    static async updateContractType(req: Request, res: Response, next: NextFunction) {
        const contractTypeId: number = +req.params.id;
        const contractType: any /*ContractType*/ = req.body;
        const result = await ContractTypeRepository.update(contractTypeId, contractType);
        return res.json(result);
    }

    static async deleteContractType(req: Request, res: Response, next: NextFunction) {
        const contractTypeId: number = +req.params.id;
        const result = await ContractTypeRepository.delete(contractTypeId);
        return res.json(result);
    }

}
