import {NextFunction, Request, Response} from "express"
import {UserController} from "./user.controller";
import {BookRepository} from "../repositories/book.repository";
import {FeedbackRepository} from "../repositories/feedback.repository";
import {Feedback} from "../models/message";
import {BillDetail} from "../models/billdetail";
import {BillDetailRepository, BillRepository} from "../repositories/bill.repository";
import {UserRepository} from "../repositories/user.repository";
import {User} from "../models/user";
import {Bill} from "../models/bill";
import {Book} from "../models/book";

export class StatisticController {

    static async newBooks(req: Request, res: Response, next: NextFunction) {
    }

    static async getNewUser(req: Request, res: Response, next: NextFunction) {
        const users: User[] = await UserRepository.find();
        const result = users.sort((a, b) => {
            return a.created_at.getTime() - b.created_at.getTime();
        });
        return res.json(result);
    }

    static async getNewBill(req: Request, res: Response, next: NextFunction) {
        const bills: Bill[] = await BillRepository.find();
        const result = bills.sort((a, b) => {
            return a.created_at.getTime() - b.created_at.getTime();
        });
        return res.json(result);
    }

    static async getNewBook(req: Request, res: Response, next: NextFunction) {
        const books: Book[] = await BookRepository.find();
        const result = books.sort((a, b) => {
            return a.created_at.getTime() - b.created_at.getTime();
        });
        return res.json(result);
    }

    static async getTopBook(req: Request, res: Response, next: NextFunction) {
        const books: Book[] = await BookRepository.find();
        const result = books.sort((a, b) => {
            const a_total = !a.feedbacks || a.feedbacks.length === 0 ? 0 : a.feedbacks.map(feedback => feedback.rating).reduce((a, b) => a + b);
            const b_total = !b.feedbacks || b.feedbacks.length === 0 ? 0 : b.feedbacks.map(feedback => feedback.rating).reduce((a, b) => a + b);
            return a_total - b_total;
        });
        return res.json(result);
    }

    static async getTopCustomers(req: Request, res: Response, next: NextFunction) {
        const users: User[] = await UserRepository.find({
            relations: {
                bills: true
            }
        });
        const result = users.sort((a, b) => {
            const a_total = !a.bills || a.bills.length === 0 ? 0 :
                a.bills.map(bill => {
                if (!bill.bill_details || bill.bill_details.length === 0)
                    return 0;
                return bill.bill_details.map(detail => detail.quantity).reduce((a, b) => a + b);
            }).reduce((a, b) => a + b);
            const b_total = !b.bills || b.bills.length === 0 ? 0 :
                b.bills.map(bill => {
                if (bill.bill_details || bill.bill_details.length === 0)
                    return 0;
                return bill.bill_details.map(detail => detail.quantity).reduce((a, b) => a + b);
            }).reduce((a, b) => a + b);
            return a_total - b_total;
        });
        return res.json(result);
    }

    static async getBookSold(req: Request, res: Response, next: NextFunction) {
        const book_id = req.params.book_id;
        let details: BillDetail[];
        if (book_id) {
            details = await BillDetailRepository.find({
                where: {
                    book_id: book_id
                }
            });
        } else {
            details = await BillDetailRepository.find();
        }

        const result: number = !details || details.length === 0 ? 0 : details.map(detail => detail.quantity).reduce((a, b) => a + b);
        return res.json({
            result: result
        });
    }

    static async getBookRate(req: Request, res: Response, next: NextFunction) {
        const book_id = req.params.book_id;
        const book = await BookRepository.findOne({
            where: {
                id: book_id
            }
        });
        const feedbacks: Feedback[] = await FeedbackRepository.find({
            where: {
                book_id: book_id
            }
        });
        if (!feedbacks)
            return res.json({
                result: 0
            });

        const result: number = !feedbacks || feedbacks.length === 0 ? 0 : feedbacks.map(feedback => feedback.rating).reduce((a, b) => a + b) / feedbacks.length;
        return res.json({
            result: result
        });
    }

}
