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

export class DepartmentsController {

    static async deleteDepartment(req: Request, res: Response, next: NextFunction) {
        const id: number = +req.params.id;
        const result = await DepartmentRepository.delete(id);
        return res.json(result);
    }

    static async getDepartment(req: Request, res: Response, next: NextFunction) {
        const id: number = +req.params.id;
        const result = await DepartmentRepository.findOne({
            where: {
                id: id
            },
            relations: ["head_employee"]
        });
        return res.json(result);
    }

    static async getDepartments(req: Request, res: Response, next: NextFunction) {
        const result = await DepartmentRepository.find({
            relations: ["head_employee"]
        });
        return res.json(result);
    }

    static async addDepartment(req: Request, res: Response, next: NextFunction) {
        const department: any /*Department*/ = req.body;
        const result = await DepartmentRepository.save(department);
        return res.json(result);
    }

    static async updateDepartment(req: Request, res: Response, next: NextFunction) {
        const departmentId: number = +req.params.id;
        const department: any /*Department*/ = req.body;
        const result = await DepartmentRepository.update(departmentId, department);
        return res.json(result);
    }

}
