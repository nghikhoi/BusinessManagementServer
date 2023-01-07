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

export class VouchersController {

    static async getVoucher(req: Request, res: Response, next: NextFunction) {
        const code: string = req.params.code;
        const result = await VoucherRepository.findOne({
            where: {
                code: code
            },
            relations: ["voucher_type", "applied_products"]
        });
        return res.json(result);
    }

    static async getVouchers(req: Request, res: Response, next: NextFunction) {
        const result = await VoucherRepository.find({
            relations: ["voucher_type", "applied_products"]
        });
        return res.json(result);
    }

    static async createVouchers(req: Request, res: Response, next: NextFunction) {
        const voucher: any /*Voucher*/ = req.body.voucher;
        const number: number = req.body.number;
        const result = await VoucherRepository.save(voucher);
        //TODO: create multiple vouchers
        return res.json(result);
    }

    static async deleteVouchers(req: Request, res: Response, next: NextFunction) {
        const ids: any[] /*IEnumerable<string>*/ = req.body;
        const result = Promise.all(ids.map(id => VoucherRepository.delete(id)));
        return res.json(result);
    }

}
