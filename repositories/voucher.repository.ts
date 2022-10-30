import {AppDataSource} from "../config/database";
import {Voucher, VoucherProfile} from "../models/voucher";

export const VoucherProfileRepository = AppDataSource.getRepository(VoucherProfile);
export const VoucherRepository = AppDataSource.getRepository(Voucher);