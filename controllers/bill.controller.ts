import {NextFunction, Request, Response} from "express"
import {BillRepository} from "../repositories/bill.repository";
import { PermissionRequire } from "./authorize.controller";

export class BillController {

    @PermissionRequire("data.bill.get")
    static async getVouchers(req: Request, res: Response, next: NextFunction) {
        const bill = await BillRepository.findOne({
            where: {
                id: +req.params.id
            },
            relations: {
                used_vouchers: true
            },
            select: ["used_vouchers"]
        });
        return res.json(bill.used_vouchers);
    }

    @PermissionRequire("data.bill.get")
    static async getByUser(req: Request, res: Response, next: NextFunction) {
        return res.json(await BillRepository.find({
            where: {
                customer_id: req.params.customer_id
            }
        }));
    }

    @PermissionRequire("data.bill.get")
    static async search(req: Request, res: Response, next: NextFunction) {
        return res.json(await BillRepository.search(req.query.select as any, req.query.skip as any, req.query.limit as any))
    }

    @PermissionRequire("data.bill.get")
    static async get(req: Request, res: Response, next: NextFunction) {
        return res.json(await BillRepository.findOne({
            where: {
                id: +req.params.id
            }
        }));
    }

    @PermissionRequire("data.bill.get")
    static async update(req: Request, res: Response, next: NextFunction) {
        const bill = await BillRepository.findOne({
            where: {
                id: +req.params.id
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

    @PermissionRequire("data.bill.get")
    static async create(req: Request, res: Response, next: NextFunction) {
        return res.json(await BillRepository.save(req.body));
    }

}
