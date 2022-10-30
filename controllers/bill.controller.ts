import {NextFunction, Request, Response} from "express"
import {BillRepository} from "../repositories/bill.repository";

export class BillController {

    static async getVouchers(req: Request, res: Response, next: NextFunction) {
        const bill = await BillRepository.findOne({
            where: {
                id: +req.params.bill_id
            },
            relations: {
                used_vouchers: true
            }
        });
        return res.json(bill.used_vouchers);
    }

    static async search(req: Request, res: Response, next: NextFunction) {
        return res.json(await BillRepository.search(req.query.select as any, req.query.skip as any, req.query.limit as any))
    }

    static async getByUser(req: Request, res: Response, next: NextFunction) {
        return res.json(await BillRepository.find({
            where: {
                user_id: req.params.user_id
            }
        }));
    }

    static async getBill(req: Request, res: Response, next: NextFunction) {
        return res.json(await BillRepository.findOne({
            where: {
                id: +req.params.bill_id
            }
        }));
    }

    static async updateBillStatus(req: Request, res: Response, next: NextFunction) {
        const bill = await BillRepository.findOne({
            where: {
                id: +req.params.bill_id
            }
        });
        if (!bill) {
            return res.status(404).json({
                message: "Bill not found"
            });
        }
        const result = BillRepository.merge(bill, req.body);
        return res.json(await BillRepository.save(result));
    }

}
