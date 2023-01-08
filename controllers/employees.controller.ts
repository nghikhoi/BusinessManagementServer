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
import {Position, PositionRecord} from "../models/position";
import {Contract} from "../models/contract";
import {passwordVerify} from "../routes/auth/auth.methods";
import {DeepPartial} from "typeorm/common/DeepPartial";
import {Employee} from "../models/employee";

export class EmployeesController {

    static async getEmployeeById(id: string) {
        const result = await EmployeeRepository.createQuery().where("employee.id = :id", {id: id}).getOne();

        if (result) {
            result['current_position'] = await EmployeesController.mappingPositionRecord(result.position_records);
            result['current_contract'] = await EmployeesController.mappingContracts(result.contracts);

            if (result.contracts) {
                const sorted = result.contracts.sort((a, b) => b.end_date.getTime() - a.end_date.getTime());
                const latestEndDate = sorted[0].end_date;
                if (latestEndDate.getTime() < new Date().getTime()) {
                    result['termination_date'] = latestEndDate;
                }
            }
        }
        return result;
    }

    static async getCurrentPosition(userId: string): Promise<Position> {
        const records = await PositionRecordRepository.find({
            where: {
                employee_id: userId
            },
            relations: ['position']
        });

        return EmployeesController.mappingPositionRecord(records);
    }

    private static mappingPositionRecord(records: PositionRecord[]) {
        if (!records || records.length === 0) {
            return null;
        }
        const currentDate = new Date();
        let currentRecord = records.filter(record => record.start_date <= currentDate && record.end_date >= currentDate)
            .sort((a, b) => a.start_date.getTime() - b.start_date.getTime())
            .pop();
        currentRecord = currentRecord ? currentRecord : records.sort((a, b) => b.end_date.getTime() - a.end_date.getTime()).pop();

        const result = currentRecord ? currentRecord.position : null;
        if (currentRecord) {
            currentRecord['is_current'] = true;
        }
        if (result) {
            result['is_current'] = true;
        }
        return result;
    }

    static async getPositionIn(employee_id: string, year: number, month: number) {
        const records = await PositionRecordRepository.find({
            where: {
                employee_id: employee_id
            },
            relations: ['position']
        });

        const filter = records.filter(record => {
            const start_date_month = record.start_date.getMonth() + 1;
            const start_date_year = record.start_date.getFullYear();
            const end_date_month = record.end_date.getMonth() + 1;
            const end_date_year = record.end_date.getFullYear();

            return (start_date_month <= month + 1 && start_date_year <= year) && (end_date_month >= month + 1 && end_date_year >= year);
        });
        let currentRecord = filter
            .sort((a, b) => a.start_date.getTime() - b.start_date.getTime())
            .pop();
        currentRecord = currentRecord ? currentRecord : filter.sort((a, b) => b.end_date.getTime() - a.end_date.getTime()).pop();

        return currentRecord ? currentRecord.position : null;
    }

    static async getCurrentContract(userId: string): Promise<Contract> {
        const records = await ContractRepository.find({
            where: {
                employee_id: userId
            },
            relations: ['type']
        });

        return EmployeesController.mappingContracts(records);
    }

    private static mappingContracts(records: Contract[]) {
        const currentDate = new Date();
        let currentRecord = records.filter(record => record.start_date <= currentDate && record.end_date >= currentDate)
            .sort((a, b) => a.start_date.getTime() - b.start_date.getTime())
            .pop();
        currentRecord = currentRecord ? currentRecord : records.sort((a, b) => b.end_date.getTime() - a.end_date.getTime()).pop();

        const result = currentRecord ? currentRecord : null;
        if (result) {
            result['is_current'] = true;
        }
        return result;
    }

    static async getContractIn(employee_id: string, year: number, month: number) {
        const records = await ContractRepository.find({
            where: {
                employee_id: employee_id
            },
            relations: ['type']
        });

        const filter = records.filter(record => {
            const start_date_month = record.start_date.getMonth() + 1;
            const start_date_year = record.start_date.getFullYear();
            const end_date_month = record.end_date.getMonth() + 1;
            const end_date_year = record.end_date.getFullYear();

            return (start_date_month <= month + 1 && start_date_year <= year) && (end_date_month >= month + 1 && end_date_year >= year);
        });
        let currentRecord = filter
            .sort((a, b) => a.start_date.getTime() - b.start_date.getTime())
            .pop();
        currentRecord = currentRecord ? currentRecord : filter.sort((a, b) => b.end_date.getTime() - a.end_date.getTime()).pop();

        return currentRecord ? currentRecord : null;
    }

    static async getEmployee(req: Request, res: Response, next: NextFunction) {
        const id: string = req.params.id;
        const result = await EmployeesController.getEmployeeById(id);

        return res.json(result);
    }

    static async getEmployees(req: Request, res: Response, next: NextFunction) {
        const result = await EmployeeRepository.createQuery().getMany();

        await Promise.all(result.map(employee => async () => {
            employee['current_position'] = await EmployeesController.getCurrentPosition(employee.id);
            employee['current_contract'] = await EmployeesController.getCurrentContract(employee.id);
        }));

        return res.json(result);
    }

    static async addEmployee(req: Request, res: Response, next: NextFunction) {
        const employee: any /*Employee*/ = req.body;

        if (employee.new_password) {
            employee.password = employee.new_password;
        }

        if (employee.department && employee.department.id && employee.department.id > 0) {
            employee.department_id = employee.department.id;
        } else {
            employee.department_id = undefined;
        }

        employee.id = undefined;
        const temp = EmployeeRepository.create(employee as DeepPartial<Employee>);
        const result = await EmployeeRepository.save(temp);

        let currentContract = employee.current_contract;
        if (!(await ContractRepository.findOne({
            where: {
                id: currentContract.id
            }
        }))) {
            currentContract.id = undefined;
            currentContract.employee_id = result.id;
            currentContract.name = "Starter";
            currentContract = await ContractRepository.save(currentContract);
        }

        if (employee.current_position) {
            const currentPosition = employee.current_position;
            await PositionRecordRepository.save({
                employee_id: result.id,
                position_id: currentPosition.id,
                start_date: currentContract.start_date,
                end_date: currentContract.end_date
            });
        }

        return res.json(await EmployeesController.getEmployeeById(result.id));
    }

    static async updateEmployee(req: Request, res: Response, next: NextFunction) {
        const employeeId: string = req.params.id;
        const employee: any /*Employee*/ = req.body;

        if (employee.new_password) {
            employee.password = employee.new_password;
        }

        if (employee.current_position) {
            const position = employee.current_position;
            const realCurrentPosition = await EmployeesController.getCurrentPosition(employeeId);

            if (realCurrentPosition && realCurrentPosition.id !== position.id) {
                const positionRecord = new PositionRecord();
                positionRecord.employee_id = employeeId;
                positionRecord.position_id = position.id;
                positionRecord.start_date = new Date();
                positionRecord.end_date = new Date(3000, 1, 1);

                const oldRecords = await PositionRecordRepository.find({
                    where: {
                        employee_id: employeeId,
                    }
                });
                for (let record of oldRecords) {
                    if (record.end_date.getTime() > new Date().getTime()) {
                        record.end_date = new Date();
                        await PositionRecordRepository.save(record);
                    }
                }

                await PositionRecordRepository.save(positionRecord);
            }
        }

        const result = await EmployeeRepository.save(employee);
        return res.json(await EmployeesController.getEmployeeById(employeeId));
    }

    static async deleteEmployee(req: Request, res: Response, next: NextFunction) {
        const id: string = req.params.id;
        const result = await EmployeeRepository.delete(id);
        return res.json(result);
    }

    static async getContractsOfEmployee(req: Request, res: Response, next: NextFunction) {
        const employeeId: string = req.params.id;
        const result = await EmployeesController.getContractsByEmployeeId(employeeId);
        return res.json(result);
    }

    private static async getContractsByEmployeeId(employeeId: string) {
        const result = await ContractRepository.find({
            where: {
                employee_id: employeeId
            },
            relations: ['type']
        })
        await EmployeesController.mappingContracts(result);
        return result;
    }

    static async addFutureContract(req: Request, res: Response, next: NextFunction) {
        const employeeId: string = req.params.id;
        const contract: any /*Contract*/ = req.body;

        if (contract.id && contract.id > 0) {
            const oldContract = await ContractRepository.findOne({
                where: {
                    id: contract.id
                }
            });
            if (oldContract) {
                oldContract.type_id = contract.type_id;
                oldContract.start_date = contract.start_date;
                oldContract.end_date = contract.end_date;
                oldContract.name = contract.name;

                await ContractRepository.save(oldContract);
                return res.json(oldContract);
            }
        }
        const result = await ContractRepository.save(contract);
        return res.json(await EmployeesController.getContractsByEmployeeId(employeeId));
    }

    static async terminateCurrentContract(req: Request, res: Response, next: NextFunction) {
        const employeeId: string = req.params.id;
        const currentContract: any /*Contract*/ = await EmployeesController.getCurrentContract(employeeId);
        currentContract.end_date = new Date();
        const result = await ContractRepository.save(currentContract);
        return res.json(await EmployeesController.getContractsByEmployeeId(employeeId));
    }

    static async deleteFutureContract(req: Request, res: Response, next: NextFunction) {
        const employeeId: string = req.params.id;
        const contracts = await EmployeesController.getContractsByEmployeeId(employeeId);

        const currentDate = new Date();
        const futureContracts = contracts.filter(contract => contract.start_date >= currentDate || contract.end_date >= currentDate);

        //terminate contracts
        await Promise.all(futureContracts.map(contract => async () => {
            contract.end_date = new Date();
            await ContractRepository.save(contract);
        }));

        return res.json(await EmployeesController.getContractsByEmployeeId(employeeId));
        /*const futureContract: any /!*Contract*!/ = req.body;
        const result = await ContractRepository.delete(futureContract.id);
        return res.json(result);*/
    }

    static async register(request: Request, response: Response, next: NextFunction) {
        const username = request.body.username;

        const existingUser = await EmployeeRepository.findOneByUser(username);
        if (existingUser) {
            console.log(existingUser);
            return response.json({
                message: 'User already exists',
                status_code: 409
            });
        }

        const temp = EmployeeRepository.create({
            username: username,
            password: request.body.password,
            birthday: request.body.birthday,
            gender: request.body.gender,
            email: request.body.email,
            phone: request.body.phone
        });
        const user = await EmployeeRepository.save(temp);

        return response.json({
            message: 'User created',
            status_code: 201,
            id: user.id
        });
    }

    static async changePassword(request: Request, response: Response, next: NextFunction) {
        const targetId = request.params.user_id;
        const oldPassword = request.body.old_password;
        const newPassword = request.body.new_password;
        const user = await EmployeeRepository.findOne({
            where: {
                id: targetId
            }
        });
        await passwordVerify(oldPassword, user.salt, user.password, async (err, res) => {
            if (!res) {
                return response.json({
                    message: 'Wrong password',
                    status_code: 401
                });
            }
            user.password = newPassword;
            await EmployeeRepository.save(user);
            return response.json({
                message: 'Password changed',
                status_code: 200
            });
        });
    }

}
