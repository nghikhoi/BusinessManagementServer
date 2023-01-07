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

export class SkillTypesController {

	static async deleteSkillType(req: Request, res: Response, next: NextFunction) {
		const id: number = +req.params.id;
		const result = await SkillTypeRepository.delete(id);
		return res.json(result);
	}

	static async getSkillType(req: Request, res: Response, next: NextFunction) {
		const id: number = +req.params.id;
		const result = await SkillTypeRepository.findOne({
			where: {
				id: id
			}
		});
		return res.json(result);
	}

	static async getSkillTypes(req: Request, res: Response, next: NextFunction) {
		const result = await SkillTypeRepository.find();
		return res.json(result);
	}

	static async addSkillType(req: Request, res: Response, next: NextFunction) {
		const skillType: any /*SkillType*/ = req.body;
		const result = await SkillTypeRepository.save(skillType);
		return res.json(result);
	}

	static async updateSkillType(req: Request, res: Response, next: NextFunction) {
		const skillTypeId: number = +req.params.id;
		const skillType: any /*SkillType*/ = req.body;
		const result = await SkillTypeRepository.update(skillTypeId, skillType);
		return res.json(result);
	}

}
