import { Contract, ContractType } from './../models/contract';
import {Employee, Gender, Skill, SkillLevel} from './../models/employee';
import { Department } from './../models/department';
import { Product, ProductCategory } from './../models/product';
import { Position, PositionRecord } from './../models/position';
import { Permission } from './../models/permission';
import { SkillType } from './../models/skill';
import { Provider } from './../models/provider';
import { AppDataSource, EntitySchemas } from './database';
import {init} from "../variables/run.variable";
import { PermissionUtils } from '../utils/permission.utils';
import { Voucher, VoucherType } from '../models/voucher';
import { Customer } from '../models/customer';
import { OvertimeRecord, SalaryRecord } from '../models/salary';
import {Order, OrderItem, OrderStatus, Payment} from '../models/order';

async function InitCommon() {
    //region Provider
    const providerRepo = AppDataSource.getRepository(Provider);

    const provider1: Provider = providerRepo.create({
        name: 'Provider 1',
        description: 'Provider 1'
    });

    const provider2: Provider = providerRepo.create({
        name: 'Provider 2',
        description: 'Provider 2'
    });

    const provider3: Provider = providerRepo.create({
        name: 'Provider 3',
        description: 'Provider 3'
    });

    await providerRepo.save([provider1, provider2, provider3]);
    console.log('Provider created');
    //endregion

    //region Skill
    const skillRepo = AppDataSource.getRepository(SkillType);

    const skill1: SkillType = skillRepo.create({
        name: 'Skill 1',
        description: 'Skill 1'
    });

    const skill2: SkillType = skillRepo.create({
        name: 'Skill 2',
        description: 'Skill 2'
    });

    const skill3: SkillType = skillRepo.create({
        name: 'Skill 3',
        description: 'Skill 3'
    });

    await skillRepo.save([skill1, skill2, skill3]);
    console.log('Skill created');
    //endregion

    //region Permission
    /*const permissionRepo = AppDataSource.getRepository(Permission);

    const permissions: Permission[] = await Promise.all(EntitySchemas.map(schema => schema.name.toLowerCase().replace('record', ''))
    .map((p) => {
        return PermissionUtils.build('data', p);
    }).flatMap(p => p).map(async (p) => {
        const permission: Permission = permissionRepo.create({
            name: `${p}`,
            description: `Permission ${p}`,
            data_type: 0,
            data_string: `${p}`
            });
        return await permissionRepo.save(permission);
    }));
    console.log('Permission created');*/
    //endregion

    //region Position
    const positionRepo = AppDataSource.getRepository(Position);

    const position1: Position = positionRepo.create({
        name: 'default',
        description: 'Position 1'
    });

    const position2: Position = positionRepo.create({
        name: 'Supporter',
        description: 'Position 2'
    });

    const position3: Position = positionRepo.create({
        name: 'Admin',
        description: 'Position 3'
    });

    await positionRepo.save([position1, position2, position3]);
    console.log('Position created');
    //endregion

    //region ProductCategory
    const productCategoryRepo = AppDataSource.getRepository(ProductCategory);

    const productCategory1: ProductCategory = productCategoryRepo.create({
        name: 'ProductCategory 1',
        description: 'ProductCategory 1'
    });

    const productCategory2: ProductCategory = productCategoryRepo.create({
        name: 'ProductCategory 2',
        description: 'ProductCategory 2'
    });

    const productCategory3: ProductCategory = productCategoryRepo.create({
        name: 'ProductCategory 3',
        description: 'ProductCategory 3'
    });

    await productCategoryRepo.save([productCategory1, productCategory2, productCategory3]);
    console.log('ProductCategory created');
    //endregion

    //region Product
    const productRepo = AppDataSource.getRepository(Product);

    const product1: Product = productRepo.create({
        name: 'Product 1',
        description: 'Product 1',
        price: 1000,
        stock: 100,
        unit: 'Unit 1',
        provider: provider1,
        categories: [productCategory1, productCategory2]
    });

    const product2: Product = productRepo.create({
        name: 'Product 2',
        description: 'Product 2',
        price: 2000,
        stock: 200,
        unit: 'Unit 2',
        provider: provider2,
        categories: [productCategory2, productCategory3]
    });

    const product3: Product = productRepo.create({
        name: 'Product 3',
        description: 'Product 3',
        price: 3000,
        stock: 300,
        unit: 'Unit 3',
        provider: provider3,
        categories: [productCategory3]
    });

    await productRepo.save([product1, product2, product3]);
    console.log('Product created');
    //endregion

    //region Department
    const departmentRepo = AppDataSource.getRepository(Department);

    const department1: Department = departmentRepo.create({
        name: 'Department 1',
        description: 'Department 1',
        phone_number: '0123456789',
    });

    const department2: Department = departmentRepo.create({
        name: 'Department 2',
        description: 'Department 2',
        phone_number: '0123456789',
    });

    const department3: Department = departmentRepo.create({
        name: 'Department 3',
        description: 'Department 3',
        phone_number: '0123456789',
    });

    await departmentRepo.save([department1, department2, department3]);
    console.log('Department created');
    //endregion

    //region Employee
    const employeeRepo = AppDataSource.getRepository(Employee);

    const employee1: Employee = employeeRepo.create({
        name: 'Employee 1',
        department: department1,
        phone: '01234562789',
        email: 'em1@gmail.com',
        address: 'Address 1',
        gender: Gender.MALE,
        birthday: new Date(),
        citizen_id: '123451356789',
        username: 'admin',
        password: '113',
    });

    const employee2: Employee = employeeRepo.create({
        name: 'Employee 2',
        department: department2,
        phone: '01234563789',
        email: 'em2@gmail.com',
        address: 'Address 2',
        gender: Gender.MALE,
        birthday: new Date(),
        citizen_id: '12323456789',
        username: 'em2',
        password: '123456',
    });

    const employee3: Employee = employeeRepo.create({
        name: 'Employee 3',
        department: department3,
        phone: '01234556789',
        email: 'em3@gmail.com',
        address: 'Address 3',
        gender: Gender.FEMALE,
        birthday: new Date(),
        citizen_id: '12345613789',
        username: 'em3',
        password: '123456',
    });

    await employeeRepo.save([employee1, employee2, employee3]);
    console.log('Employee created');
    //endregion

    //region EmployeeSkill
    const employeeSkillRepo = AppDataSource.getRepository(Skill);

    const employeeSkill1: Skill = employeeSkillRepo.create({
        employee: employee1,
        skill: skill1,
        level: SkillLevel.Unrated,
    });

    const employeeSkill2: Skill = employeeSkillRepo.create({
        employee: employee2,
        skill: skill2,
        level: SkillLevel.Unrated,
    });

    const employeeSkill3: Skill = employeeSkillRepo.create({
        employee: employee3,
        skill: skill3,
        level: SkillLevel.Unrated,
    });

    await employeeSkillRepo.save([employeeSkill1, employeeSkill2, employeeSkill3]);
    console.log('EmployeeSkill created');
    //endregion

    //region PositionRecord
    const positionRecordRepo = AppDataSource.getRepository(PositionRecord);

    const positionRecord1: PositionRecord = positionRecordRepo.create({
        employee: employee1,
        position: position1,
        start_date: new Date(),
        end_date: new Date(),
    });

    const positionRecord2: PositionRecord = positionRecordRepo.create({
        employee: employee2,
        position: position2,
        start_date: new Date(),
        end_date: new Date(),
    });

    const positionRecord3: PositionRecord = positionRecordRepo.create({
        employee: employee3,
        position: position3,
        start_date: new Date(),
        end_date: new Date(),
    });

    await positionRecordRepo.save([positionRecord1, positionRecord2, positionRecord3]);
    console.log('PositionRecord created');
    //endregion

    //region OvertimeRecord
    const overtimeRecordRepo = AppDataSource.getRepository(OvertimeRecord);

    const overtimeRecord1: OvertimeRecord = overtimeRecordRepo.create({
        employee: employee1,
        day: 1,
        month: 1,
        year: 2020,
        from: new Date(),
        to: new Date(),
    });

    const overtimeRecord2: OvertimeRecord = overtimeRecordRepo.create({
        employee: employee2,
        day: 2,
        month: 2,
        year: 2020,
        from: new Date(),
        to: new Date(),
    });

    const overtimeRecord3: OvertimeRecord = overtimeRecordRepo.create({
        employee: employee3,
        day: 3,
        month: 3,
        year: 2020,
        from: new Date(),
        to: new Date(),
    });

    await overtimeRecordRepo.save([overtimeRecord1, overtimeRecord2, overtimeRecord3]);
    console.log('OvertimeRecord created');
    //endregion

    //region SalaryRecord
    const salaryRecordRepo = AppDataSource.getRepository(SalaryRecord);

    const salaryRecord1: SalaryRecord = salaryRecordRepo.create({
        employee: employee1,
        month: 1,
        year: 2020,
        basic_salary: 1000000,
        bonus_salary: 1100000,
        supplement_salary: 1200000,
    });

    const salaryRecord2: SalaryRecord = salaryRecordRepo.create({
        employee: employee2,
        month: 2,
        year: 2020,
        basic_salary: 2000000,
        bonus_salary: 2200000,
        supplement_salary: 2400000,
    });

    const salaryRecord3: SalaryRecord = salaryRecordRepo.create({
        employee: employee3,
        month: 3,
        year: 2020,
        basic_salary: 3000000,
        bonus_salary: 3300000,
        supplement_salary: 3600000,
    });

    await salaryRecordRepo.save([salaryRecord1, salaryRecord2, salaryRecord3]);
    console.log('SalaryRecord created');
    //endregion

    //region ContractType
    const contractTypeRepo = AppDataSource.getRepository(ContractType);

    const contractType1: ContractType = contractTypeRepo.create({
        id: 'CT0001',
        name: 'ContractType 1',
        description: 'ContractType 1',
        base_salary: 1000000,
        period: 1,
    });

    const contractType2: ContractType = contractTypeRepo.create({
        id: 'CT0002',
        name: 'ContractType 2',
        description: 'ContractType 2',
        base_salary: 2000000,
        period: 2,
    });

    const contractType3: ContractType = contractTypeRepo.create({
        id: 'CT0003',
        name: 'ContractType 3',
        description: 'ContractType 3',
        base_salary: 3000000,
        period: 3,
    });

    await contractTypeRepo.save([contractType1, contractType2, contractType3]);
    console.log('ContractType created');
    //endregion

    //region Contract
    const contractRepo = AppDataSource.getRepository(Contract);

    const contract1: Contract = contractRepo.create({
        name: 'Contract 1',
        employee: employee1,
        start_date: new Date(),
        end_date: new Date(),
    });

    const contract2: Contract = contractRepo.create({
        name: 'Contract 2',
        employee: employee2,
        start_date: new Date(),
        end_date: new Date(),
    });

    const contract3: Contract = contractRepo.create({
        name: 'Contract 3',
        employee: employee3,
        start_date: new Date(),
        end_date: new Date(),
    });

    await contractRepo.save([contract1, contract2, contract3]);
    console.log('Contract created');
    //endregion

    //region VoucherType
    const voucherTypeRepo = AppDataSource.getRepository(VoucherType);

    const voucherType1: VoucherType = voucherTypeRepo.create({
        name: 'VoucherType 1',
        description: 'VoucherType 1',
        discount: 10
    });

    const voucherType2: VoucherType = voucherTypeRepo.create({
        name: 'VoucherType 2',
        description: 'VoucherType 2',
        discount: 20
    });

    const voucherType3: VoucherType = voucherTypeRepo.create({
        name: 'VoucherType 3',
        description: 'VoucherType 3',
        discount: 30
    });

    await voucherTypeRepo.save([voucherType1, voucherType2, voucherType3]);
    console.log('VoucherType created');
    //endregion

    //region Voucher
    const voucherRepo = AppDataSource.getRepository(Voucher);

    const voucher1: Voucher = voucherRepo.create({
        code: 'Voucher 1',
        release_date: new Date(),
        expire_date: new Date(),
        voucher_type: voucherType1,
    });

    const voucher2: Voucher = voucherRepo.create({
        code: 'Voucher 2',
        release_date: new Date(),
        expire_date: new Date(),
        voucher_type: voucherType2,
    });

    const voucher3: Voucher = voucherRepo.create({
        code: 'Voucher 3',
        release_date: new Date(),
        expire_date: new Date(),
        voucher_type: voucherType3,
    });

    await voucherRepo.save([voucher1, voucher2, voucher3]);
    console.log('Voucher created');
    //endregion

    //region Customer
    const customerRepo = AppDataSource.getRepository(Customer);

    const customer1: Customer = customerRepo.create({
        name: 'Customer 1',
        phone: '012345136789',
        email: 'ab@gmail.com',
        citizen_id: '12342556789',
        address: 'Address 1',
        birthday: new Date(),
    });

    const customer2: Customer = customerRepo.create({
        name: 'Customer 2',
        phone: '0123451356789',
        email: 'ab2@gmail.com',
        citizen_id: '12312456789',
        address: 'Address 2',
        birthday: new Date(),
    });

    const customer3: Customer = customerRepo.create({
        name: 'Customer 3',
        phone: '0123412556789',
        email: 'ab3@gmail.com',
        citizen_id: '123124567123',
        address: 'Address 3',
        birthday: new Date(),
    });

    await customerRepo.save([customer1, customer2, customer3]);
    console.log('Customer created');
    //endregion

    //region Bill
    const billRepo = AppDataSource.getRepository(Order);

    const bill1: Order = billRepo.create({
        customer: customer1,
        create_employee: employee1,
        bank: '123456789',
        payment: Payment.CASH,
        status: OrderStatus.COMPLETED,
        address: 'Address 1',
    });

    const bill2: Order = billRepo.create({
        customer: customer2,
        create_employee: employee2,
        bank: '123456789',
        payment: Payment.CASH,
        status: OrderStatus.COMPLETED,
        address: 'Address 2',
    });

    const bill3: Order = billRepo.create({
        customer: customer3,
        create_employee: employee3,
        bank: '123456789',
        payment: Payment.CASH,
        status: OrderStatus.COMPLETED,
        address: 'Address 3',
    });

    await billRepo.save([bill1, bill2, bill3]);
    console.log('Bill created');
    //endregion

    //region BillDetail
    const billDetailRepo = AppDataSource.getRepository(OrderItem);

    const billDetail1: OrderItem = billDetailRepo.create({
        bill: bill1,
        product: product1,
        quantity: 1,
        unit_price: 1000000,
    });

    const billDetail2: OrderItem = billDetailRepo.create({
        bill: bill1,
        product: product2,
        quantity: 2,
        unit_price: 2000000,
    });

    const billDetail3: OrderItem = billDetailRepo.create({
        bill: bill1,
        product: product3,
        quantity: 3,
        unit_price: 3000000,
    });

    const billDetail4: OrderItem = billDetailRepo.create({
        bill: bill2,
        product: product1,
        quantity: 1,
        unit_price: 1000000,
    });

    const billDetail5: OrderItem = billDetailRepo.create({
        bill: bill3,
        product: product2,
        quantity: 2,
        unit_price: 2000000,
    });

    await billDetailRepo.save([billDetail1, billDetail2, billDetail3, billDetail4, billDetail5]);
    console.log('BillDetail created');
    //endregion
}

export async function InitSamples() {
    console.log('Initializing database...');
    if (!init) {
        console.log('Database already initialized.');
        return;
    }
    console.log('Sample initializing...');

    await InitCommon();

    console.log('Samples initialized');
}
