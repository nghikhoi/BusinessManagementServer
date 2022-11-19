import { SalaryRecord, OvertimeRecord } from '../models/salary';
import { AppDataSource } from '../config/database';

export const SalaryRepository = AppDataSource.getRepository(SalaryRecord);
export const OvertimeRepository = AppDataSource.getRepository(OvertimeRecord);