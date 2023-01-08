import {NextFunction, Request, Response} from "express";
import {EmployeeRepository, SkillRecordRepository} from "../repositories/employee.repository";
import {SkillRepository} from "../repositories/skill.repository";
import {EmployeesController} from "./employees.controller";
import {Employee, SkillRecord, SkillLevel, SkillOverview} from "../models/employee";

export class SkillRecordsController {

    static async getSkillOverview(employee_id: string) {
        const records = await SkillRecordRepository.find({
            where: {
                employee_id: employee_id
            },
            relations: ["skill"]
        });

        const skillOverview = new SkillOverview();
        skillOverview.employee = await EmployeesController.getEmployeeById(employee_id);
        skillOverview.skills = records;
        skillOverview.last_updated_time = records && records.length > 0 ? records[0].updated_at : new Date();

        return skillOverview;
    }

    static async getSkillOverviews(req: Request, res: Response, next: NextFunction) {
        const employeeIds = await EmployeeRepository.find({select: ['id']});

        const result = await Promise.all(employeeIds.map(async (employeeId) => {
            return await SkillRecordsController.getSkillOverviewDetails(employeeId.id);
        }));

        return res.json(result);
    }

    static async getSkillDetails(req: Request, res: Response, next: NextFunction) {
        const employeeId: string = req.params.id;
        const skills = await SkillRecordsController.getSkillOverviewDetails(employeeId);

        return res.json(skills);
    }

    private static async getSkillOverviewDetails(employeeId: string) {
        const employee = await EmployeesController.getEmployeeById(employeeId);

        const types = await SkillRepository.find();
        const skills = await SkillRecordsController.getSkillOverview(employeeId);

        types.forEach((type) => {
            if (!skills.skills.find((skill) => skill.skill.id === type.id)) {
                skills.skills.push({
                    skill: type,
                    skill_id: type.id,
                    updated_at: new Date(),
                    level: SkillLevel.Unrated,
                    employee_id: employeeId,
                    employee: employee
                });
            }
        });
        return skills;
    }

    static async updateSkills(req: Request, res: Response, next: NextFunction) {
        const employeeId: string = req.params.id;
        const records: any[] /*List<SkillRecord>*/ = req.body;
        const result = await Promise.all(records.map(async (record) => {
            const oldRecord = await SkillRecordRepository.findOneBy({
                employee_id: employeeId,
                skill_id: record.skill.id
            });

            if (oldRecord) {
                oldRecord.level = record.level;
                return await SkillRecordRepository.save(oldRecord);
            } else {
                const newRecord = SkillRecordRepository.create({
                    employee_id: employeeId,
                    skill_id: record.skill.id,
                    level: record.level
                });
                return await SkillRecordRepository.save(newRecord);
            }
        }));
        return res.json(result);
    }

}
