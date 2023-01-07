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
import {BusinessConfigRepository} from "../repositories/config.repository";

export class ConfigController {

	static async loadConfig(req: Request, res: Response, next: NextFunction) {
		const result = await BusinessConfigRepository.find();
		return res.json(result.length > 0 ? result[0] : null);
	}

	static async saveConfig(req: Request, res: Response, next: NextFunction) {
		const config: any /*Config*/ = req.body;
		const result = await BusinessConfigRepository.save(config);
		return res.json(result);
	}

}
