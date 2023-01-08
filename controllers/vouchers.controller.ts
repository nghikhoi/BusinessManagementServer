import {NextFunction, Request, Response} from "express";
import {OrderItemRepository} from "../repositories/bill.repository";
import {ContractRepository, ContractTypeRepository} from "../repositories/contract.repository";
import {CustomerRepository} from "../repositories/customer.repository";
import {DepartmentRepository} from "../repositories/department.repository";
import {ImageRepository, VideoRepository} from "../repositories/file.repository";
import {EmployeeRepository, SkillRecordRepository} from "../repositories/employee.repository";
import {PositionRepository} from "../repositories/position.repository";
import {ProductCategoryRepository, ProductRepository} from "../repositories/product.repository";
import {ProviderRepository} from "../repositories/provider.repository";
import {SkillRepository} from "../repositories/skill.repository";
import {
    OvertimeRecordRepository,
    PositionRecordRepository,
    SalaryRecordRepository
} from "../repositories/salary.repository";
import {VoucherRepository, VoucherTypeRepository} from "../repositories/voucher.repository";
import {BonusRecordRepository, BonusTypeRepository} from "../repositories/bonus.repository";
import {Voucher} from "../models/voucher";

export class VouchersController {

    static async getVoucher(req: Request, res: Response, next: NextFunction) {
        const code: string = req.params.code;
        const result = await VoucherRepository.createQuery().where('voucher.code = :code', {code: code}).getOne();
        return res.json(result);
    }

    static async getVouchers(req: Request, res: Response, next: NextFunction) {
        const result = await VoucherRepository.createQuery().getMany();
        return res.json(result);
    }

    private static generateCode(length: number): string {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    static async createVouchers(req: Request, res: Response, next: NextFunction) {
        const voucherTemplate: any = req.body;
        const number: number = +req.query.amount;

        const voucher_type = voucherTemplate.voucher_type;

        if (!voucher_type) {
            return res.json([]);
        }

        const typeId = voucher_type.id;

        const vouchers: Voucher[] = [];
        for (let i = 0; i < number; i++) {
            const voucher = new Voucher();
            voucher.code = VouchersController.generateCode(8);
            voucher.type = typeId;
            voucher.release_date = voucherTemplate.release_date;
            voucher.expire_date = voucherTemplate.expire_date;
            vouchers.push(voucher);
        }

        const temp = await VoucherRepository.save(vouchers);
        const result = await Promise.all(temp.map(voucher => {
            return VoucherRepository.createQuery().where('voucher.code = :code', {code: voucher.code}).getOne();
        }));
        return res.json(result);
    }

    static async deleteVouchers(req: Request, res: Response, next: NextFunction) {
        const ids: any[] /*IEnumerable<string>*/ = req.body;
        let vouchers = await Promise.all(ids.map(id => {
            return VoucherRepository.createQuery().where('voucher.code = :code', {code: id}).getOne();
        }));

        vouchers = vouchers.filter(v => v != null);

        await Promise.all(vouchers.map(voucher => {
            return VoucherRepository.remove(voucher);
        }));
        return res.json(vouchers);
    }

}
