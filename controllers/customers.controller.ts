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

export class CustomersController {

    static async deleteCustomer(req: Request, res: Response, next: NextFunction) {
        const id: string = req.params.id;
        const result = await CustomerRepository.delete(id);
        return res.json(result);
    }

    static async getCustomer(req: Request, res: Response, next: NextFunction) {
        const id: string = req.params.id;
        const result = await this.getCustomerById(id);
        return res.json(result);
    }

    static async getCustomerById(id: string) {
        const result = await CustomerRepository.findOne({
            where: {
                id: id
            }
        });
        return result;
    }

    static async getCustomers(req: Request, res: Response, next: NextFunction) {
        const result = await CustomerRepository.find();
        return res.json(result);
    }

    static async addCustomer(req: Request, res: Response, next: NextFunction) {
        const customer: any /*Customer*/ = req.body;
        const result = await CustomerRepository.save(customer);
        return res.json(result);
    }

    static async updateCustomer(req: Request, res: Response, next: NextFunction) {
        const customerId: string = req.params.id;
        const customer: any /*Customer*/ = req.body;
        const result = await CustomerRepository.update(customerId, customer);
        return res.json(result);
    }

}
