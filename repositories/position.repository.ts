import { Position } from './../models/position';
import { AppDataSource } from '../config/database';

export const PositionRepository = AppDataSource.getRepository(Position);
