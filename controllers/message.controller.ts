import {NextFunction, Request, Response} from "express"
import {FeedbackRepository, MessageRepository, ReplyFeedbackRepository} from "../repositories/feedback.repository";
import {ImageRepository, VideoRepository} from "../repositories/file.repository";
import { PermissionRequire } from "./authorize.controller";

export class MessageController {

    @PermissionRequire("data.bill.get")
    static async getFeedback(req: Request, res: Response, next: NextFunction) {
        return res.json(await FeedbackRepository.find({
            where: {
                product_id: req.params.product_id
            }
        }));
    }

    @PermissionRequire("data.bill.get")
    static async getFeedbacks(req: Request, res: Response, next: NextFunction) {
        return res.json(await FeedbackRepository.search(req.query.select as any, req.query.skip as any, req.query.limit as any));
    }

    @PermissionRequire("data.bill.get")
    static async addFeedback(req: Request, res: Response, next: NextFunction) {
        const feedback = FeedbackRepository.create({
            user_id: req["user"]["id"],
            product_id: req.params.product_id,
            rating: req.body.rating,
            text: req.body.text,
        });
        if (req.body.images) {
            feedback.images = await Promise.all(req.body.images.map(imageId => {
                return ImageRepository.findOne({
                    where: {
                        id: imageId
                    }
                });
            }));
        }
        if (req.body.videos) {
            feedback.videos = await Promise.all(req.body.videos.map(videoId => {
                return VideoRepository.findOne({
                    where: {
                        id: videoId
                    }
                });
            }));
        }
        return res.json(await FeedbackRepository.save(feedback));
    }

    @PermissionRequire("data.bill.get")
    static async addMessage(req: Request, res: Response, next: NextFunction) {
        const message = ReplyFeedbackRepository.create({
            user_id: req["user"]["id"],
            text: req.body.text,
        });
        if (req.body.images) {
            message.images = await Promise.all(req.body.images.map(imageId => {
                return ImageRepository.findOne({
                    where: {
                        id: imageId
                    }
                });
            }));
        }
        if (req.body.videos) {
            message.videos = await Promise.all(req.body.videos.map(videoId => {
                return VideoRepository.findOne({
                    where: {
                        id: videoId
                    }
                });
            }));
        }
        const reply = await ReplyFeedbackRepository.save(message);
        const feedback = await FeedbackRepository.findOne({
            where: {
                id: req.params.feedback
            }
        });
        if (feedback.replies)
            feedback.replies.push(reply);
        else
            feedback.replies = [reply];
        await FeedbackRepository.save(feedback);
        return res.json(reply);
    }

}
