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

export class VoucherTypesController {

    static async deleteVoucherType(req: Request, res: Response, next: NextFunction) {
        const id: number = +req.params.id;
        const result = await VoucherTypeRepository.delete(id);
        return res.json(result);
    }

    static async getVoucherType(req: Request, res: Response, next: NextFunction) {
        const id: number = +req.params.id;
        const result = await VoucherTypeRepository.findOne({
            where: {
                id: id
            }
        });
        return res.json(result);
    }

    static async getVoucherTypes(req: Request, res: Response, next: NextFunction) {
        const result = await VoucherTypeRepository.find();
        return res.json(result);
    }

    static async addVoucherType(req: Request, res: Response, next: NextFunction) {
        const voucherType: any /*VoucherType*/ = req.body;
        const result = await VoucherTypeRepository.save(voucherType);
        return res.json(result);
    }

    static async updateVoucherType(req: Request, res: Response, next: NextFunction) {
        const voucherTypeId: number = +req.params.id;
        const voucherType: any /*VoucherType*/ = req.body;
        const result = await VoucherTypeRepository.update(voucherTypeId, voucherType);
        return res.json(result);
    }

}
