import {NextFunction, Request, Response} from "express"
import { PositionRepository } from '../repositories/position.repository';

export class PositionController {

    static async getAll(request: Request, response: Response, next: NextFunction) {
        return response.json(await PositionRepository.find());
    }

    static async getOne(request: Request, response: Response, next: NextFunction) {
        return response.json(await PositionRepository.findOneBy({
            id: +request.params.position_id
        }));
    }

    static async save(request: Request, response: Response, next: NextFunction) {
        return PositionRepository.save(request.body)
    }

    static async delete(request: Request, response: Response, next: NextFunction) {
        return PositionRepository.delete(request.body)
    }

}