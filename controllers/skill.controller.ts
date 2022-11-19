import {NextFunction, Request, Response} from "express"
import { SkillRepository } from '../repositories/skill.repository';

export class SkillController {

    static async getAll(request: Request, response: Response, next: NextFunction) {
        return response.json(await SkillRepository.find());
    }

    static async getOne(request: Request, response: Response, next: NextFunction) {
        return response.json(await SkillRepository.findOneBy({
            id: +request.params.skill_id
        }));
    }

    static async save(request: Request, response: Response, next: NextFunction) {
        return SkillRepository.save(request.body)
    }

    static async delete(request: Request, response: Response, next: NextFunction) {
        return SkillRepository.delete(request.body)
    }

}