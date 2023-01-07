import { Voucher, VoucherType } from './../models/voucher';
import {AppDataSource} from "../config/database";

export const VoucherRepository = AppDataSource.getRepository(Voucher);
export const VoucherTypeRepository = AppDataSource.getRepository(VoucherType);
