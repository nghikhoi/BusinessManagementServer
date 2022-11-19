import { Contract } from './../models/contract';
import { AppDataSource } from './../config/database';

export const ContractRepository = AppDataSource.getRepository(Contract);