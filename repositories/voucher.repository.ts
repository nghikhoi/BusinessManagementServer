import { Voucher } from './../models/voucher';
import {AppDataSource} from "../config/database";

export const VoucherRepository = AppDataSource.getRepository(Voucher);