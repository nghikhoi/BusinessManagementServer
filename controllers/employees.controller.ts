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
import {Position} from "../models/position";
import {Contract} from "../models/contract";
import {passwordVerify} from "../routes/auth/auth.methods";

export class EmployeesController {

    static async getCurrentPosition(userId: string): Promise<Position> {
        const records = await PositionRecordRepository.find({
            where: {
                employee_id: userId
            },
            relations: ['position']
        });

        const currentDate = new Date();
        const currentRecord = records.filter(record => record.start_date <= currentDate && record.end_date >= currentDate)
            .sort((a, b) => a.start_date.getTime() - b.start_date.getTime())
            .pop();

        return currentRecord ? currentRecord.position : null;
    }

    static async getCurrentContract(userId: string): Promise<Contract> {
        const records = await ContractRepository.find({
            where: {
                employee_id: userId
            },
            relations: ['type']
        });

        const currentDate = new Date();
        const currentRecord = records.filter(record => record.start_date <= currentDate && record.end_date >= currentDate)

        return currentRecord ? currentRecord.pop() : null;
    }

    static async getEmployee(req: Request, res: Response, next: NextFunction) {
        const id: string = req.params.id;
        const result = await this.getEmployeeById(id);

        return res.json(result);
    }

    static async getEmployeeById(id: string) {
        const result = await EmployeeRepository.createQuery().where("employee.id = :id", {id: id}).getOne();

        if (result) {
            result['current_position'] = await EmployeesController.getCurrentPosition(result.id);
            result['current_contract'] = await EmployeesController.getCurrentContract(result.id);
        }
        return result;
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
        const result = await EmployeeRepository.save(employee);
        return res.json(result);
    }

    static async updateEmployee(req: Request, res: Response, next: NextFunction) {
        const employeeId: string = req.params.employeeId;
        const employee: any /*Employee*/ = req.body;
        const result = await EmployeeRepository.save(employee);
        return res.json(result);
    }

    static async deleteEmployee(req: Request, res: Response, next: NextFunction) {
        const id: string = req.params.id;
        const result = await EmployeeRepository.delete(id);
        return res.json(result);
    }

    static async getContractsOfEmployee(req: Request, res: Response, next: NextFunction) {
        const employeeId: string = req.params.id;
        const result = await this.getContractsByEmployeeId(employeeId);
        return res.json(result);
    }

    private static async getContractsByEmployeeId(employeeId: string) {
        const result = await ContractRepository.find({
            where: {
                employee_id: employeeId
            }
        })
        return result;
    }

    static async addFutureContract(req: Request, res: Response, next: NextFunction) {
        const employeeId: string = req.params.id;
        const contract: any /*Contract*/ = req.body;
        const result = await ContractRepository.save(contract);
        return res.json(result);
    }

    static async terminateCurrentContract(req: Request, res: Response, next: NextFunction) {
        const employeeId: string = req.params.id;
        const currentContract: any /*Contract*/ = await this.getCurrentContract(employeeId);
        currentContract.end_date = new Date();
        const result = await ContractRepository.save(currentContract);
        return res.json(result);
    }

    static async deleteFutureContract(req: Request, res: Response, next: NextFunction) {
        const employeeId: string = req.params.id;
        const contracts = await this.getContractsByEmployeeId(employeeId);

        const currentDate = new Date();
        const futureContracts = contracts.filter(contract => contract.start_date >= currentDate || contract.end_date >= currentDate);

        //terminate contracts
        await Promise.all(futureContracts.map(contract => async () => {
            contract.end_date = new Date();
            await ContractRepository.save(contract);
        }));

        return res.json(futureContracts);
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
