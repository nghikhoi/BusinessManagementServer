import {NextFunction, Request, Response} from "express"
import {VoucherProfileRepository, VoucherRepository} from "../repositories/voucher.repository";

export class VoucherController {

    static async getProfiles(req: Request, res: Response, next: NextFunction) {
        return res.json(await VoucherProfileRepository.find());
    }

    static async getProfile(req: Request, res: Response, next: NextFunction) {
        return res.json(await VoucherProfileRepository.findOne({
            where: {
                id: req.params.profile_id
            }
        }));
    }

    static async getVoucher(req: Request, res: Response, next: NextFunction) {
        return res.json(await VoucherRepository.find({
            where: {
                id: req.params.voucher_id
            }
        }));
    }

}