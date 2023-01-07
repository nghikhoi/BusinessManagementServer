import {Contract, ContractType} from './../models/contract';
import { AppDataSource } from './../config/database';

export const ContractRepository = AppDataSource.getRepository(Contract);
export const ContractTypeRepository = AppDataSource.getRepository(ContractType);
