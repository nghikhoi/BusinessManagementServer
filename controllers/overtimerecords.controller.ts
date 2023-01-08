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
import {EmployeesController} from "./employees.controller";
import {ConfigController} from "./config.controller";
import {OvertimeOverview} from "../models/salary";

export class OvertimeRecordsController {

	static async getOvertimeOverviews(req: Request, res: Response, next: NextFunction) {
		const employeeIds = await EmployeeRepository.find({select: ['id']});
		const year: number = +req.params.year;
		const month: number = +req.params.month;
		const result = await Promise.all(employeeIds.map(async (employeeId) => {
			return await OvertimeRecordsController.getOvertimeDetailsOfEmployee(employeeId.id, year, month);
		}));
		return res.json(result);
	}

	static async getOvertimeDetails(req: Request, res: Response, next: NextFunction) {
		const employeeId: string = req.params.employee_id;
		const year: number = +req.params.year;
		const month: number = +req.params.month;
		const result = await OvertimeRecordsController.getOvertimeDetailsOfEmployee(employeeId, year, month);
		return res.json(result);
	}

	static async getOvertimeDetailsOfEmployee(employeeId: string, year: number, month: number) {
		const records = await OvertimeRecordRepository.createQueryBuilder("record")
			.where('MONTH(record.date) = :month', {month: month})
			.andWhere('YEAR(record.date) = :year', {year: year})
			.andWhere('record.employee_id = :employeeId', {employeeId: employeeId})
			.getMany();

		const employee = await EmployeesController.getEmployeeById(employeeId);
		const month_year = new Date(year, month - 1, 1);
		const num_of_overtime_days = records.length;
		const avg_overtime_duration = records.reduce((sum, record) => sum + record.hours, 0) / num_of_overtime_days;

		const config = await ConfigController.getConfig();
		const overtimeRate = config.overtime_hourly_rate;
		const total_overtime_pay = records.reduce((sum, record) => sum + record.hours * overtimeRate, 0);

		const result = new OvertimeOverview();
		result.employee = employee;
		result.month_year = month_year;
		result.num_of_overtime_days = num_of_overtime_days;
		result.avg_overtime_duration = avg_overtime_duration;
		result.total_overtime_pay = total_overtime_pay;
		result.records = records;

		return result;
	}

	static async updateOvertimeRecords(req: Request, res: Response, next: NextFunction) {
		const employeeId: string = req.params.employee_id;
		const year: number = +req.params.year;
		const month: number = +req.params.month;
		const records: any /*List<OvertimeRecord>*/ = req.body;
		const result = await Promise.all(records.map(async (record) => {
			const oldRecord = await OvertimeRecordRepository.findOneBy({
				employee_id: employeeId,
				date: record.date
			});

			if (oldRecord) {
				oldRecord.hours = record.hours;
				return await OvertimeRecordRepository.save(oldRecord);
			} else {
				return await OvertimeRecordRepository.save(record);
			}
		}));
		return res.json(result);
	}

}
