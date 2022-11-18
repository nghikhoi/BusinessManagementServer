import {NextFunction, Request, Response} from "express"
import {VoucherRepository} from "../repositories/voucher.repository";

export class VoucherController {

    static async getVouchers(req: Request, res: Response, next: NextFunction) {
        return res.json(await VoucherRepository.find());
    }

    static async getVoucher(req: Request, res: Response, next: NextFunction) {
        return res.json(await VoucherRepository.find({
            where: {
                id: req.params.voucher_id
            }
        }));
    }

}