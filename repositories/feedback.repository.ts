import {AppDataSource} from "../config/database";
import {Feedback, Message, ReplyFeedback} from "../models/message";
import {SelectQueryBuilder} from "typeorm";
import {Order} from "../models/bill";

export const MessageRepository = AppDataSource.getRepository(Message);
export const FeedbackRepository = AppDataSource.getRepository(Feedback).extend({
    search(select?: string[], skip?: number, limit?: number, decorator?: Function) {
        const query: SelectQueryBuilder<Feedback> = this.createQueryBuilder("feedback");
        if (select) {
            query.select(select.map(item => "feedback." + item));
        }
        if (skip) {
            query.skip(skip)
        }
        if (limit) {
            query.limit(limit)
        }
        const temp = decorator ? decorator(query) : query;
        return temp.leftJoinAndSelect("feedback.images", "images").getMany();
    },
});
export const ReplyFeedbackRepository = AppDataSource.getRepository(ReplyFeedback);
