import {ClassConstructor, plainToInstance} from "class-transformer";
import {validateSync} from "class-validator";

export const ValidateProperty = (body?: ClassConstructor<any>, query?: ClassConstructor<any>, params?: ClassConstructor<any>) => {
    return (req: any, res: any, next: any) => {
        const errors = [];
        if (body) {
            const instance = plainToInstance(body, req.body, {
                enableImplicitConversion: true,
                excludeExtraneousValues: true,
            });
            errors.push(...validateSync(instance, {
                skipMissingProperties: true,
            }));
        }
        if (query) {
            const instance = plainToInstance(query, req.query, {
                enableImplicitConversion: true,
                excludeExtraneousValues: true,
            });
            errors.push(...validateSync(instance, {
                skipMissingProperties: true,
            }));
        }
        if (params) {
            const instance = plainToInstance(params, req.params, {
                enableImplicitConversion: true,
                excludeExtraneousValues: true,
            });
            errors.push(...validateSync(instance, {
                skipMissingProperties: true,
            }));
        }
        if (errors && errors.length > 0) {
            res.status(400).send(errors);
        } else {
            next();
        }
    };
};
