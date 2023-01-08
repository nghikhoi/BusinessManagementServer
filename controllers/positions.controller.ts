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

export class PositionsController {

	static async deletePosition(req: Request, res: Response, next: NextFunction) {
		const id: number = +req.params.id;
		const result = await PositionRepository.delete(id);
		return res.json(result);
	}

	static async getPosition(req: Request, res: Response, next: NextFunction) {
		const id: number = +req.params.id;
		const result = await PositionRepository.findOne({
			where: {
				id: id
			}
		});
		return res.json(result);
	}

	static async getPositions(req: Request, res: Response, next: NextFunction) {
		const result = await PositionRepository.find();
		return res.json(result);
	}

	static async addPosition(req: Request, res: Response, next: NextFunction) {
		const position: any /*Position*/ = req.body;
		const result = await PositionRepository.save(position);
		return res.json(result);
	}

	static async updatePosition(req: Request, res: Response, next: NextFunction) {
		const positionId: number = +req.params.id;
		const position: any /*Position*/ = req.body;
		const result = await PositionRepository.update(positionId, position);
		return res.json(result);
	}

}
