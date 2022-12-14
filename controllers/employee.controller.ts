import { EmployeeRepository } from './../repositories/employee.repository';
import {NextFunction, Request, Response} from "express"
import {bodyFilter} from "./helper";
import { passwordVerify } from "../routes/auth/auth.methods";
import { PermissionRequire } from './authorize.controller';

export class EmployeeController {

    @PermissionRequire("data.employee.get")
    static async getAll(request: Request, response: Response, next: NextFunction) {
        return response.json(await EmployeeRepository.find());
    }

    @PermissionRequire("data.employee.get")
    static async getAllByDepartment(request: Request, response: Response, next: NextFunction) {
        return response.json(await EmployeeRepository.findBy({
            department_id: request.params.department_id
        }));
    }

    @PermissionRequire("data.employee.get")
    static async getUser(request: Request, response: Response, next: NextFunction) {
        return response.json(await EmployeeRepository.findOneBy({
            id: request.params.user_id
        }));
    }

    @PermissionRequire("data.employee.get")
    static async search(request: Request, response: Response, next: NextFunction) {
        const query = request.query;
        if (request.params.search) {
            return response.json(await EmployeeRepository.searchByUser(request.params.search, query.select as any, query.skip as any, query.limit as any));
        }
        return response.json(await EmployeeRepository.search(query.select as any, query.skip as any, query.limit as any, query.search as any, query.search_by as any));
    }

    @PermissionRequire("data.employee.get")
    static async save(request: Request, response: Response, next: NextFunction) {
        return EmployeeRepository.save(request.body)
    }

    @PermissionRequire("data.employee.get")
    static async register(request: Request, response: Response, next: NextFunction) {
        const username =  request.body.username;

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

    @PermissionRequire("data.employee.get")
    static async remove(request: Request, response: Response, next: NextFunction) {
        let userToRemove = await EmployeeRepository.findOneBy({id: request.params['id']})
        await EmployeeRepository.remove(userToRemove)
    }

    @PermissionRequire("data.employee.get")
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
