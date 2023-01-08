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
import {BusinessConfigRepository} from "../repositories/config.repository";

export class ConfigController {

    static async loadConfig(req: Request, res: Response, next: NextFunction) {
        const result = await ConfigController.getConfig();
        return res.json(result);
    }

    static async getConfig() {
        const businessConfig = await BusinessConfigRepository.find();
        const result = businessConfig.length > 0 ? businessConfig[businessConfig.length - 1] : null;
        return result;
    }

    static async saveConfig(req: Request, res: Response, next: NextFunction) {
        const config: any /*Config*/ = req.body;
        const result = await BusinessConfigRepository.save(config);
        return res.json(result);
    }

    static async initConfig() {
        const temp = await BusinessConfigRepository.find();
        if (temp.length > 0) {
            return;
        }

        const config = await BusinessConfigRepository.save({
            max_num_of_overtime_hours: 8,
            overtime_hourly_rate: 100000,
            vat_rate: 10,
        });
    }

    static async initContractTypes() {
        const temp = await ContractTypeRepository.find();
        if (temp.length > 0) {
            return;
        }

        const longTimeType = await ContractTypeRepository.save({
            name: "Hợp đồng dài hạn",
            description: "Hợp đồng dài hạn",
            base_salary: 0,
            period: 1800,
        });

        const internType = await ContractTypeRepository.save({
            name: "Thực tập",
            description: "Hợp đồng thực tập",
            base_salary: 0,
            period: 4*30,
        });

        const oneYearType = await ContractTypeRepository.save({
            name: "Hợp đồng 1 năm",
            description: "Hợp đồng 1 năm",
            base_salary: 0,
            period: 12*30,
        });

        const threeYearType = await ContractTypeRepository.save({
            name: "Hợp đồng 3 năm",
            description: "Hợp đồng 3 năm",
            base_salary: 0,
            period: 36*30,
        });
    }

    static async initPosition() {
        const temp = await PositionRepository.find();
        if (temp.length > 0) {
            return;
        }

        const adminPosition = PositionRepository.create({
            name: "Director",
            description: "Quản trị viên",
            can_manage_config: true,
            can_manage_customers: true,
            can_manage_hr: true,
            can_manage_orders: true,
            can_manage_sales: true,
            can_view_config: true,
            can_view_customers: true,
            can_view_hr: true,
            can_view_orders: true,
            can_view_sales: true,
            supplement_salary: 100000000
        });
        await PositionRepository.save(adminPosition);

        const hrManagerPosition = PositionRepository.create({
            name: "HR Manager",
            description: "Quản lý nhân sự",
            supplement_salary: 40000000,
            can_manage_hr: true,
            can_view_hr: true,
        });
        await PositionRepository.save(hrManagerPosition);

        const salesManagerPosition = PositionRepository.create({
            name: "Sales Manager",
            description: "Quản lý bán hàng",
            supplement_salary: 25000000,
            can_manage_sales: true,
            can_view_sales: true,
            can_view_customers: true,
            can_manage_customers: true,
        });
        await PositionRepository.save(salesManagerPosition);

        const salesEmployeePosition = PositionRepository.create({
            name: "Sales Employee",
            description: "Nhân viên bán hàng",
            supplement_salary: 10000000,
            can_view_orders: true,
            can_manage_orders: true,
            can_view_sales: true,
            can_view_customers: true,
        });
        await PositionRepository.save(salesEmployeePosition);
    }

    static async initBonusType() {
        const temp = await BonusTypeRepository.find();
        if (temp.length > 0) {
            return;
        }

        const bonusType = BonusTypeRepository.create({
            name: "Mức 1",
            description: "Hoàn thành tốt",
            amount: 100000,
        });
        await BonusTypeRepository.save(bonusType);

        const bonusType2 = BonusTypeRepository.create({
            name: "Mức 2",
            description: "Hoàn thành",
            amount: 50000,
        });
        await BonusTypeRepository.save(bonusType2);

        const bonusType3 = BonusTypeRepository.create({
            name: "Mức 3",
            description: "Không hoàn thành",
            amount: 0,
        });
        await BonusTypeRepository.save(bonusType3);
    }

}
