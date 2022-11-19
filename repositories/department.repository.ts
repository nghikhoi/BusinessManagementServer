import { SalaryRecord, OvertimeRecord } from './../models/salary';
import { Department } from './../models/department';
import { AppDataSource } from './../config/database';

export const DepartmentRepository = AppDataSource.getRepository(Department);