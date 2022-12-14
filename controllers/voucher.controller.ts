import {NextFunction, Request, Response} from "express"
import {VoucherRepository} from "../repositories/voucher.repository";
import { PermissionRequire } from "./authorize.controller";

export class VoucherController {

    @PermissionRequire("data.bill.get")
    static async getVouchers(req: Request, res: Response, next: NextFunction) {
        return res.json(await VoucherRepository.find());
    }

    @PermissionRequire("data.bill.get")
    static async getVoucher(req: Request, res: Response, next: NextFunction) {
        return res.json(await VoucherRepository.find({
            where: {
                code: req.params.voucher_id
            }
        }));
    }

}