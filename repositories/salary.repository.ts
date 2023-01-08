import { SalaryRecord, OvertimeRecord } from '../models/salary';
import { AppDataSource } from '../config/database';
import {PositionRecord} from "../models/position";
import {SelectQueryBuilder} from "typeorm";

export const SalaryRecordRepository = AppDataSource.getRepository(SalaryRecord).extend({

});
export const OvertimeRecordRepository = AppDataSource.getRepository(OvertimeRecord);
export const PositionRecordRepository = AppDataSource.getRepository(PositionRecord);
