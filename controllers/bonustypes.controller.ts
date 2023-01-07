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

export class BonusTypesController {

	static async getBonusTypes(req: Request, res: Response, next: NextFunction) {
		const result = await BonusTypeRepository.find();
		return res.json(result);
	}

	static async getBonusType(req: Request, res: Response, next: NextFunction) {
		const id: number = +req.params.id;
		const result = await BonusTypeRepository.findOne({
			where: {
				id: id
			}
		});
		return res.json(result);
	}

	static async addBonusType(req: Request, res: Response, next: NextFunction) {
		const type: any /*BonusType*/ = req.body;
		const result = await BonusTypeRepository.save(type);
		return res.json(result);
	}

	static async updateBonusType(req: Request, res: Response, next: NextFunction) {
		const id: number = +req.params.id;
		const type: any /*BonusType*/ = req.body;
		const result = await BonusTypeRepository.save(type);
		return res.json(result);
	}

	static async deleteBonusType(req: Request, res: Response, next: NextFunction) {
		const id: number = +req.params.id;
		const result = await BonusTypeRepository.delete(id);
		return res.json(result);
	}

}
