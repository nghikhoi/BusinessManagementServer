import {BusinessConfig} from "../models/config";
import {AppDataSource} from "../config/database";

export const BusinessConfigRepository = AppDataSource.getRepository(BusinessConfig);
