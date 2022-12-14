import { PositionRepository } from './../repositories/position.repository';
import { EntitySchemas, AppDataSource } from './../config/database';
import { DataSource } from 'typeorm';
import { PermissionUtils } from "../utils/permission.utils";
import { Permission } from '../models/permission';

export class AuthorityService {

    private static default_permissions: Permission[] = null;

    static async getDefaultPermissions() : Promise<String[]> {
        if (this.default_permissions == null) {
            this.default_permissions = await (async () => {
                const defaultPosition = await PositionRepository.findOneBy({
                    id: 0
                });
                return defaultPosition == null ? [] : defaultPosition.permissions;
            })();
        }
        return [];
    }

}