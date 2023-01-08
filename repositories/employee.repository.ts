import {Position, PositionRecord} from './../models/position';
import {Employee, SkillRecord} from './../models/employee';
import {AppDataSource} from "../config/database";
import {SelectQueryBuilder} from "typeorm";
import Fuse from "fuse.js";
import {Contract, ContractType} from "../models/contract";

export const IdentifyProperties = [
    'id',
    'username',
    'email'
];

export const ProfileProperties = [
    'firstname',
    'lastname',
    'email',
    'phone',
    'gender',
    'birthday',
    'first_time'
];

export const AuthProperties = [
    'salt',
    'password',
    'refresh_token'
]

export const EmployeeRepository = AppDataSource.getRepository(Employee).extend({
    async search(select?: string[], skip?: number, limit?: number, search?: string, search_by?: string, decorator?: Function) {
        const query: SelectQueryBuilder<Employee> = this.createQueryBuilder("employee");
        if (select) {
            query.select(select.map(item => "employee." + item));
        }
        if (skip) {
            console.log("skip: ", skip);
            query.skip(skip)
        }
        if (limit) {
            console.log("limit: ", limit);
            query.limit(limit)
        }
        const temp = decorator ? decorator(query) : query;
        const result = temp.getMany();
        if (search) {
            const search_key = !search_by ? "username" : search_by;

            const options = {
                includeScore: true,
                keys: [search_key]
            }

            const fuse = new Fuse(await result, options)

            const search_result = fuse.search(search);
            return search_result.map(item => item.item);
        }
        return result;
    },
    createQuery(): SelectQueryBuilder<Employee> {
        let query: SelectQueryBuilder<Employee> = this.createQueryBuilder("employee");

        query = query.leftJoinAndSelect("employee.position_records", "position_records")
            .leftJoinAndSelect("position_records.position", "position")
            .leftJoinAndSelect("employee.contracts", "contracts")
            .leftJoinAndSelect("contracts.type", "type");

        /*//Join with position record
        query = query.leftJoinAndMapMany('employee.position_records', PositionRecord, 'employee.position_records', 'employee.position_records.employee_id = employee.id')

        //Join with position
        query = query.leftJoinAndMapMany('employee.position_records.position'
            , Position, 'employee.position_records.position'
            , 'employee.position_records.position.id = employee.position_records.position_id')

        //Join with contract list
        query = query.leftJoinAndMapMany('employee.contracts', Contract, 'employee.contracts', 'employee.contracts.employee_id = employee.id')

        //Join with contract type
        query = query.leftJoinAndMapMany('employee.contracts.type', ContractType, 'employee.contracts.type', 'employee.contracts.type.id = employee.contracts.type_id')*/

        return query;
    },
    searchByUser(username: string, select?: string[], skip?: number, limit?: number, decorator?: Function) {
        return this.search(select, skip, limit, null, null, (query: SelectQueryBuilder<Employee>) => {
            const temp = query.where("LOWER(username) LIKE :username", {username: `%${username.toLowerCase()}%`})
                .orWhere("LOWER(email) LIKE :username", {username: `%${username.toLowerCase()}%`});
            return decorator ? decorator(temp) : temp;
        });
    },
    findOneByUser(username: string, select?: string[]): Promise<Employee | null> {
        let query: SelectQueryBuilder<Employee> = this.createQuery()
            .where("LOWER(username) LIKE :username", {employeename: `${username.toLowerCase()}`})
            .orWhere("LOWER(email) LIKE :username", {username: `${username.toLowerCase()}`});
        if (select) {
            query = query.select(select.map(item => "employee." + item));
        }
        return query.getOne();
    },
    findWithRelations(): Promise<Employee[] | null> {
        return this.createQuery().getMany();
    }
})

export const SkillRecordRepository = AppDataSource.getRepository(SkillRecord);
