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

export class ProvidersController {

	static async deleteProvider(req: Request, res: Response, next: NextFunction) {
		const id: number = +req.params.id;
		const result = await ProviderRepository.delete(id);
		return res.json(result);
	}

	static async getProvider(req: Request, res: Response, next: NextFunction) {
		const id: number = +req.params.id;
		const result = await ProviderRepository.findOne({
			where: {
				id: id
			}
		});
		return res.json(result);
	}

	static async getProviders(req: Request, res: Response, next: NextFunction) {
		const result = await ProviderRepository.find();
		return res.json(result);
	}

	static async addProvider(req: Request, res: Response, next: NextFunction) {
		const provider: any /*Provider*/ = req.body;
		const result = await ProviderRepository.save(provider);
		return res.json(result);
	}

	static async updateProvider(req: Request, res: Response, next: NextFunction) {
		const providerId: number = +req.params.id;
		const provider: any /*Provider*/ = req.body;
		const result = await ProviderRepository.update(providerId, provider);
		return res.json(result);
	}

}
