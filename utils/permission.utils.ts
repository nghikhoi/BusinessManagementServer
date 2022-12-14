import { Permission } from "../models/permission";

export class PermissionUtils {

    static build(category: String, name: String) : String[] {
        return ["create", "read", "update", "delete", "*"].map((action) => `${category}.${name}.${action}`.toLowerCase());
    } 

    static isAllow(permission: String, value : number | string | boolean) : boolean {
        const permissionModel = this.fromString(permission);
        switch (permissionModel.data_type) {
            case 0:
                return permissionModel.data_string == value;
            case 1:
                return permissionModel.data_number == value;
            case 2:
                return permissionModel.data_boolean == value;
            default:
                return false;
        }
    }


    static toString(permission: Permission) : String {
        var valueAsString = "";
        switch (permission.data_type) {
            case 0:
                valueAsString = permission.data_string;
                break;
            case 1:
                valueAsString = permission.data_number.toString();
                break;
            case 2:
                valueAsString = permission.data_boolean.toString();
                break;
            default:
                break;
        }
        return `${permission.id}:${permission.data_type}:${valueAsString}`
    }

    static fromString(permission: String) : Permission {
        const [id, data_type, data] = permission.split(":");
        const permissionModel = new Permission();
        permissionModel.id = parseInt(id);
        permissionModel.data_type = parseInt(data_type);
        switch (permissionModel.data_type) {
            case 0:
                permissionModel.data_string = data;
                break;
            case 1:
                permissionModel.data_number = parseInt(data);
                break;
            case 2:
                permissionModel.data_boolean = data == "true";
                break;
            default:
                break;
        }
        return permissionModel;
    }

}