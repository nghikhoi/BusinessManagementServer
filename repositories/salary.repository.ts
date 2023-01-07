import { SalaryRecord, OvertimeRecord } from '../models/salary';
import { AppDataSource } from '../config/database';
import {PositionRecord} from "../models/position";

export const SalaryRecordRepository = AppDataSource.getRepository(SalaryRecord);
export const OvertimeRecordRepository = AppDataSource.getRepository(OvertimeRecord);
export const PositionRecordRepository = AppDataSource.getRepository(PositionRecord);
