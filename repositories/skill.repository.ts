import {SkillType} from './../models/skill';
import {Contract} from '../models/contract';
import {AppDataSource} from '../config/database';

export const SkillTypeRepository = AppDataSource.getRepository(SkillType);
