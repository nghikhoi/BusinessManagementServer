import {NextFunction, Request, Response} from "express"
import { SkillTypeRepository } from '../repositories/skill.repository';

export class SkillController {

    static async getAll(request: Request, response: Response, next: NextFunction) {
        return response.json(await SkillTypeRepository.find());
    }

    static async getOne(request: Request, response: Response, next: NextFunction) {
        return response.json(await SkillTypeRepository.findOneBy({
            id: +request.params.skill_id
        }));
    }

    static async update(req: Request, res: Response, next: NextFunction) {
        const entity = await SkillTypeRepository.findOne({
            where: {
                id: +req.params.id
            }
        });
        if (!entity) {
            return res.status(404).json({
                message: "Entity not found"
            });
        }
        const result = SkillTypeRepository.merge(entity, req.body);
        return res.json(await SkillTypeRepository.save(result));
    }

    static async save(request: Request, response: Response, next: NextFunction) {
        return SkillTypeRepository.save(request.body)
    }

    static async delete(request: Request, response: Response, next: NextFunction) {
        return SkillTypeRepository.delete(request.body)
    }

}