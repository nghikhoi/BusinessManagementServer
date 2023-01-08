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
import {OvertimeRecordsController} from "./overtimerecords.controller";
import {BonusRecordsController} from "./bonusrecords.controller";
import {SalaryRecord} from "../models/salary";
import {ConfigController} from "./config.controller";

export class SalaryReportController {

    static async getSalaryRecords(req: Request, res: Response, next: NextFunction) {
        const month = +req.params.month;
        const year = +req.params.year;
        const employeeIds = await EmployeeRepository.find({select: ['id']});

        const result = await Promise.all(employeeIds.map(async employee => {
            return await SalaryReportController.getSalaryReportOfEmployee(employee.id, year, month);
        }));

        return res.json(result);
    }

    static async getSalaryReportOfEmployee(employee_id: string, year: number, month: number) {
        const contract = await EmployeesController.getContractIn(employee_id, year, month);
        const position = await EmployeesController.getPositionIn(employee_id, year, month);
        const overtime = await OvertimeRecordsController.getOvertimeDetailsOfEmployee(employee_id, year, month);
        const bonus = await BonusRecordsController.getBonusRecordOfEmployee(employee_id, year, month);

        const salaryReport = new SalaryRecord();
        salaryReport.employee = await EmployeesController.getEmployeeById(employee_id);
        salaryReport.month = month;
        salaryReport.year = year;
        salaryReport.basic_salary = 0;
        if (contract) {
            salaryReport.basic_salary = contract.type.base_salary;
        }
        salaryReport.supplement_salary = 0;
        if (position) {
            salaryReport.supplement_salary = position.supplement_salary;
        }
        salaryReport.total_overtime_pay = overtime.total_overtime_pay;
        salaryReport.bonus_salary = bonus.reduce((total, bonus) => total + bonus.amount, 0);
        salaryReport.total_salary = salaryReport.basic_salary + salaryReport.supplement_salary + salaryReport.total_overtime_pay + salaryReport.bonus_salary;

        return salaryReport;
    }

}
