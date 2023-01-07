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
import {EmployeesController} from "./employees.controller";
import {Employee, Skill} from "../models/employee";

export class SkillOverview {

    employee: Employee;

    last_updated_time: Date;

    skills: Skill[];

}

export class SkillRecordsController {

    static async getSkillOverview(employee_id: string) {
        const skills = await SkillRepository.find({
            where: {
                employee_id: employee_id
            },
            relations: ["skill"]
        });

        const skillOverview = new SkillOverview();
        skillOverview.employee = await EmployeesController.getEmployeeById(employee_id);
        skillOverview.skills = skills;
        skillOverview.last_updated_time = skills[0].updated_at;

        return skillOverview;
    }

    static async getSkillOverviews(req: Request, res: Response, next: NextFunction) {
        const skills = await SkillRepository.find({
            relations: ["skill"]
        });

        const skillOverviews: SkillOverview[] = [];

        for (const skill of skills) {
            const skillOverview = skillOverviews.find((overview) => overview.employee.id === skill.employee_id);
            if (skillOverview) {
                skillOverview.skills.push(skill);
                skillOverview.last_updated_time = skill.updated_at > skillOverview.last_updated_time ? skill.updated_at : skillOverview.last_updated_time;
            } else {
                const employee = await EmployeesController.getEmployeeById(skill.employee_id);
                skillOverviews.push({
                    employee: employee,
                    last_updated_time: skill.updated_at,
                    skills: [skill]
                });
            }
        }

        return res.json(skillOverviews);
    }

    static async getSkillDetails(req: Request, res: Response, next: NextFunction) {
        const employeeId: string = req.params.id;
        return res.json(await this.getSkillOverview(employeeId));
    }

    static async updateSkills(req: Request, res: Response, next: NextFunction) {
        const employeeId: string = req.params.id;
        const skills: any[] /*List<SkillRecord>*/ = req.body;
        const result = Promise.all(skills.map(async (skill) => {
            await SkillRepository.save({
                employee_id: employeeId,
                skill_type_id: skill.skill_type.id,
                level: skill.level
            });
        })); //TODO
        return res.json(result);
    }

}
