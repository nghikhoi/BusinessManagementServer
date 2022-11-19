import { Customer } from './../models/customer';
import { AppDataSource } from '../config/database';

export const CustomerRepository = AppDataSource.getRepository(Customer);