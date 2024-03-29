import {Skill} from './../models/skill';
import {Contract} from '../models/contract';
import {AppDataSource} from '../config/database';

export const SkillRepository = AppDataSource.getRepository(Skill);
