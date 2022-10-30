import {NextFunction, Request, Response} from "express"
import {StorageLogDetailRepository, StorageLogRepository} from "../repositories/storagelog.repository";
import {StorageAction} from "../models/storagelog";
import {BookRepository} from "../repositories/book.repository";
import {BillRepository} from "../repositories/bill.repository";

export class StorageController {

    static async searchImport(req: Request, res: Response, next: NextFunction) {
        return await StorageLogRepository.searchByAction(StorageAction.IMPORT, req.query.skip as any, req.query.limit as any);
    }

    static async import(req: Request, res: Response, next: NextFunction) {
        const userId = req['user']['id'];
        const log = StorageLogRepository.create({
            action: StorageAction.IMPORT,
            actor_id: userId,
            description: req.body.description,
            date: new Date()
        });

        const details = [];
        req.body.details.forEach(detail => {
            details.push(StorageLogDetailRepository.create({
                log_id: log.id,
                book_id: detail.book_id,
                quantity: detail.quantity
            }));
        });
        log.details = details;

        Promise.all([StorageLogRepository.save(log), ...log.details.map(detail => BookRepository.increaseQuantity(detail.book_id, detail.quantity))])
            .then(() => res.status(201).json(log))
            .catch(next);
    }

    static async searchExport(req: Request, res: Response, next: NextFunction) {
        return await StorageLogRepository.searchByAction(StorageAction.EXPORT, req.query.skip as any, req.query.limit as any);
    }

    static async export(req: Request, res: Response, next: NextFunction) {
        const userId = req['user']['id'];
        const log = StorageLogRepository.create({
            action: StorageAction.EXPORT,
            actor_id: userId,
            description: req.body.description,
            date: new Date()
        });

        const details = [];
        req.body.details.forEach(detail => {
            details.push(StorageLogDetailRepository.create({
                log_id: log.id,
                book_id: detail.book_id,
                quantity: detail.quantity
            }));
        });
        log.details = details;

        await Promise.all([StorageLogRepository.save(log), ...log.details.map(detail => BookRepository.decreaseQuantity(detail.book_id, detail.quantity))])
            .then(() => res.status(201).json(log))
            .catch(next);
    }

    static async exportFromBill(req: Request, res: Response, next: NextFunction) {
        const billId = +req.params.bill_id;

        const Bill = await BillRepository.findOne({
            where: {
                id: billId
            },
            relations: {
                bill_details: true
            }
        })

        req.body.details = Bill.bill_details.map(detail => {
            return {
                book_id: detail.book_id,
                quantity: detail.quantity
            }
        });
        await this.export(req, res, next);
    }

}