import { PermissionUtils } from './../utils/permission.utils';
import { Employee } from './../models/employee';
import {NextFunction, Request, Response} from "express"

export function PermissionRequire(permission: string) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        const original = descriptor.value;
      
        descriptor.value = function (req: Request, res: Response, next: NextFunction) {
            const user = req.user;
            if (!user) {
                return res.status(401).json({
                    message: "Unauthorized"
                });
            }
            //TODO: Uncomment this when you have permission
            // const permissions = (req.user as any).permissions as string[];
            // if (!permissions) {
            //     return res.status(403).json({
            //         message: "Forbidden"
            //     });
            // }
            // if (permissions.findIndex((p) => !PermissionUtils.isAllow(p, permission)) < 0) {
            //     return res.status(403).json({
            //         message: "No permission"
            //     });
            // }
            return original.call(this, req, res, next);
        }
      }
}