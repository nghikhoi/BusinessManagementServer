import { Product, ProductCategory } from './../models/product';
import { Bill, BillDetail } from './../models/bill';
import { Provider } from './../models/provider';
import { Voucher, VoucherType } from './../models/voucher';
import { Message, Feedback, ReplyFeedback } from './../models/message';
import { Audio, Image, Document, Video, Other } from './../models/file';
import { Permission } from './../models/permission';
import { Department } from './../models/department';
import { Contract, ContractType } from './../models/contract';
import { SalaryRecord, OvertimeRecord } from './../models/salary';
import { SkillType } from './../models/skill';
import { Position, PositionRecord } from './../models/position';
import { Customer } from './../models/customer';
import { Employee, Skill } from './../models/employee';
import "reflect-metadata"
import {DataSource, DefaultNamingStrategy, NamingStrategyInterface, Table} from "typeorm"
import {
    DATABASE_HOST,
    DATABASE_CONNECTION_NAME,
    DATABASE_DRIVER,
    DATABASE_NAME,
    DATABASE_PORT,
    DATABASE_PASSWORD,
    DATABASE_SOCKET_PATH,
    DATABASE_USERNAME
} from "../variables/database.variable"

import {snakeCase} from "typeorm/util/StringUtils";

class LowercaseNamingStrategy extends DefaultNamingStrategy implements NamingStrategyInterface {

    tableName(className: string, customName: string): string {
        return customName ? customName : snakeCase(className);
    }

    columnName(
        propertyName: string,
        customName: string,
        embeddedPrefixes: string[],
    ): string {
        return (
            snakeCase(embeddedPrefixes.concat('').join('_')) +
            (customName ? customName : snakeCase(propertyName))
        );
    }

    relationName(propertyName: string): string {
        return snakeCase(propertyName);
    }

    joinColumnName(relationName: string, referencedColumnName: string): string {
        return snakeCase(relationName + '_' + referencedColumnName);
    }

    joinTableName(
        firstTableName: string,
        secondTableName: string,
        firstPropertyName: string,
        secondPropertyName: string,
    ): string {
        return snakeCase(
            firstTableName +
            '_' +
            firstPropertyName.replace(/\./gi, '_') +
            '_' +
            secondTableName,
        );
    }

    joinTableColumnName(
        tableName: string,
        propertyName: string,
        columnName?: string,
    ): string {
        return snakeCase(
            tableName + '_' + (columnName ? columnName : propertyName),
        );
    }

    classTableInheritanceParentColumnName(
        parentTableName: any,
        parentTableIdPropertyName: any,
    ): string {
        return snakeCase(parentTableName + '_' + parentTableIdPropertyName);
    }

    eagerJoinRelationAlias(alias: string, propertyPath: string): string {
        return alias + '__' + propertyPath.replace('.', '_');
    }

}

let _host = DATABASE_HOST;
let _connectionString;
if (DATABASE_SOCKET_PATH) {
    _connectionString = _host = `${DATABASE_SOCKET_PATH}/${DATABASE_CONNECTION_NAME}`;
    console.log('Using socket path: ');
    console.log(`   HOST: ${_host}`);
    console.log(`   SOCKET_PATH: ${_connectionString}`);
}

export const AppDataSource = new DataSource({
    type: DATABASE_DRIVER as any,
    host: _host,
    port: +DATABASE_PORT,
    username: DATABASE_USERNAME,
    password: DATABASE_PASSWORD,
    database: DATABASE_NAME,
    extra: {
        socketPath: _connectionString
    },
    insecureAuth: true,
    synchronize: true,
    logging: ['error', 'info'],
    namingStrategy: new LowercaseNamingStrategy(),
    entities: [
        Permission,
        Position,
        SkillType,
        ContractType,
        Contract,

        Provider,
        ProductCategory,
        Product,
        VoucherType,
        Voucher,
        BillDetail,
        Bill,

        PositionRecord,
        Employee,
        Skill,
        OvertimeRecord,
        SalaryRecord,
        Customer,
        Department,

        //File
        , Video
        , Audio
        , Image
        , Document
        , Other.
        

        //Message
        , Message
        , Feedback
        , ReplyFeedback
    ]
})
