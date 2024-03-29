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

export class BonusRecordsController {

	static async getBonusRecords(req: Request, res: Response, next: NextFunction) {
		const year: number = +req.params.year;
		const month: number = +req.params.month;
		const result = await BonusRecordRepository.find({
			where: {
				year: year,
				month: month
			},
			relations: ["employee", "bonus_type"]
		});
		return res.json(result);
	}

	static async getBonusRecordOfEmployee(employee_id: string, year: number, month: number) {
		const result = await BonusRecordRepository.find({
			where: {
				employee_id: employee_id,
				year: year,
				month: month
			},
			relations: ["employee", "bonus_type"]
		});
		return result;
	}

	static async updateBonusRecords(req: Request, res: Response, next: NextFunction) {
		const year: number = +req.params.year;
		const month: number = +req.params.month;
		const records: any[] = req.body;
		const temp = await Promise.all(records.map(async (record) => {
			return await BonusRecordRepository.save({
				employee_id: record.employee.id,
				year: year,
				month: month,
				bonus_type_id: record.bonus_type.id,
				amount: record.amount
			});
		}));

		let result = [];
		if (temp && temp.length > 0) {
			result = await BonusRecordRepository.find({
				where: {
					year: year,
					month: month,
					employee_id: temp[0].employee_id
				},
				relations: ["employee", "bonus_type"]
			});
		}

		return res.json(result);
	}

}
