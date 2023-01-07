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

export class OvertimeRecordsController {

	static async getOvertimeOverviews(req: Request, res: Response, next: NextFunction) {
		const year: number = +req.params.year;
		const month: number = +req.params.month;
		const result = await OvertimeRecordRepository.find({
			where: {
				year: year,
				month: month
			}
		});
		return res.json(result);
	}

	static async getOvertimeDetails(req: Request, res: Response, next: NextFunction) {
		const employeeId: string = req.params.employee_id;
		const year: number = +req.params.year;
		const month: number = +req.params.month;
		const result = await OvertimeRecordRepository.find({
			where: {
				employee_id: employeeId,
				year: year,
				month: month
			}
		});
		return res.json(result);
	}

	static async updateOvertimeRecords(req: Request, res: Response, next: NextFunction) {
		const employeeId: string = req.params.employee_id;
		const year: number = +req.params.year;
		const month: number = +req.params.month;
		const records: any /*List<OvertimeRecord>*/ = req.body;
		const result = await Promise.all(records.map(async (record) => {
			return await OvertimeRecordRepository.save({
				employee_id: employeeId,
				year: year,
				month: month,
				date: record.date,
				hours: record.hours
			});
		}));
		return res.json(result);
	}

}
