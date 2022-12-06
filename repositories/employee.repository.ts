import { Employee, Skill } from './../models/employee';
import {AppDataSource} from "../config/database";
import {SelectQueryBuilder} from "typeorm";
import Fuse from "fuse.js";

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
    searchByUser(username: string, select?: string[], skip?: number, limit?: number, decorator?: Function) {
        return this.search(select, skip, limit, null, null, (query: SelectQueryBuilder<Employee>) => {
            const temp = query.where("LOWER(username) LIKE :username", {username: `%${username.toLowerCase()}%`})
                .orWhere("LOWER(email) LIKE :username", {username: `%${username.toLowerCase()}%`});
            return decorator ? decorator(temp) : temp;
        });
    },
    findOneByUser(username: string, select?: string[]) {
        let query: SelectQueryBuilder<Employee> = this.createQueryBuilder("employee").where("LOWER(username) LIKE :username", {employeename: `${username.toLowerCase()}`})
            .orWhere("LOWER(email) LIKE :username", {username: `${username.toLowerCase()}`});
        if (select) {
            query = query.select(select.map(item => "employee." + item));
        }
        return query.getOne();
    }
})

export const EmployeeSkillRepository = AppDataSource.getRepository(Skill)