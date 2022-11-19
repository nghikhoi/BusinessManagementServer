import { Permission } from './../models/permission';
import { Position } from './../models/position';
import { AppDataSource } from '../config/database';

export const PermissionRepository = AppDataSource.getRepository(Permission)
export const PositionRepository = AppDataSource.getRepository(Position);