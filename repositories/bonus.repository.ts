import {BonusRecord, BonusType} from "../models/bonus";
import {AppDataSource} from "../config/database";

export const BonusTypeRepository = AppDataSource.getRepository(BonusType);
export const BonusRecordRepository = AppDataSource.getRepository(BonusRecord);
