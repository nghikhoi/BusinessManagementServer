import { Contract, ContractType } from './../models/contract';
import { Employee, Gender, EmployeeSkill } from './../models/employee';
import { Department } from './../models/department';
import { Product, ProductCategory } from './../models/product';
import { Position } from './../models/position';
import { Permission } from './../models/permission';
import { Skill } from './../models/skill';
import { Provider } from './../models/provider';
import { AppDataSource } from './database';
import {init} from "../variables/run.variable";
import { Image } from '../models/file';

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
    const skillRepo = AppDataSource.getRepository(Skill);

    const skill1: Skill = skillRepo.create({
        name: 'Skill 1',
        description: 'Skill 1'
    });

    const skill2: Skill = skillRepo.create({    
        name: 'Skill 2',
        description: 'Skill 2'
    });

    const skill3: Skill = skillRepo.create({
        name: 'Skill 3',
        description: 'Skill 3'
    });

    await skillRepo.save([skill1, skill2, skill3]);
    console.log('Skill created');
    //endregion

    //region Permission
    const permissionRepo = AppDataSource.getRepository(Permission);

    const permission1: Permission = permissionRepo.create({
        name: 'Permission 1',
        description: 'Permission 1'
    });

    const permission2: Permission = permissionRepo.create({
        name: 'Permission 2',
        description: 'Permission 2'
    });

    const permission3: Permission = permissionRepo.create({
        name: 'Permission 3',
        description: 'Permission 3'
    });

    await permissionRepo.save([permission1, permission2, permission3]);
    console.log('Permission created');
    //endregion

    //region Position
    const positionRepo = AppDataSource.getRepository(Position);

    const position1: Position = positionRepo.create({
        name: 'Position 1',
        description: 'Position 1'
    });

    const position2: Position = positionRepo.create({
        name: 'Position 2',
        description: 'Position 2'
    });

    const position3: Position = positionRepo.create({
        name: 'Position 3',
        description: 'Position 3'
    });

    //TODO: Add permission

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
        quantity: 100,
        unit: 'Unit 1',
        provider: provider1,
        categories: [productCategory1, productCategory2]
    });

    const product2: Product = productRepo.create({
        name: 'Product 2',
        description: 'Product 2',
        price: 2000,
        quantity: 200,
        unit: 'Unit 2',
        provider: provider2,
        categories: [productCategory2, productCategory3]
    });

    const product3: Product = productRepo.create({
        name: 'Product 3',
        description: 'Product 3',
        price: 3000,
        quantity: 300,
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
        description: 'Department 1'
    });

    const department2: Department = departmentRepo.create({
        name: 'Department 2',
        description: 'Department 2'
    });

    const department3: Department = departmentRepo.create({
        name: 'Department 3',
        description: 'Department 3'
    });

    await departmentRepo.save([department1, department2, department3]);
    console.log('Department created');
    //endregion

    //region Employee
    const employeeRepo = AppDataSource.getRepository(Employee);

    const employee1: Employee = employeeRepo.create({
        name: 'Employee 1',
        department: department1,
        phone: '0123456789',
        email: 'em1@gmail.com',
        address: 'Address 1',
        gender: Gender.MALE,
        birthday: new Date(),
        citizen_id: '123456789',
        username: 'em1',
        password: '123456',
    });

    const employee2: Employee = employeeRepo.create({
        name: 'Employee 2',
        department: department2,
        phone: '0123456789',
        email: 'em2@gmail.com',
        address: 'Address 2',
        gender: Gender.MALE,
        birthday: new Date(),
        citizen_id: '123456789',
        username: 'em2',
        password: '123456',
    });

    const employee3: Employee = employeeRepo.create({
        name: 'Employee 3',
        department: department3,
        phone: '0123456789',
        email: 'em3@gmail.com',
        address: 'Address 3',
        gender: Gender.FEMALE,
        birthday: new Date(),
        citizen_id: '123456789',
        username: 'em3',
        password: '123456',
    });

    await employeeRepo.save([employee1, employee2, employee3]);
    console.log('Employee created');
    //endregion

    //region EmployeeSkill
    const employeeSkillRepo = AppDataSource.getRepository(EmployeeSkill);

    const employeeSkill1: EmployeeSkill = employeeSkillRepo.create({
        employee: employee1,
        skill: skill1,
        level: 1
    });

    const employeeSkill2: EmployeeSkill = employeeSkillRepo.create({
        employee: employee2,
        skill: skill2,
        level: 2
    });

    const employeeSkill3: EmployeeSkill = employeeSkillRepo.create({
        employee: employee3,
        skill: skill3,
        level: 3
    });

    await employeeSkillRepo.save([employeeSkill1, employeeSkill2, employeeSkill3]);
    console.log('EmployeeSkill created');
    //endregion

    //region Contract
    const contractRepo = AppDataSource.getRepository(Contract);

    const contract1: Contract = contractRepo.create({
        name: 'Contract 1',
        employee: employee1,
        start_date: new Date(),
        end_date: new Date(),
        salary: 1000000,
        bonus: 100000,
        type: ContractType.PERMNANENT,
    });

    const contract2: Contract = contractRepo.create({
        name: 'Contract 2',
        employee: employee2,
        start_date: new Date(),
        end_date: new Date(),
        salary: 2000000,
        bonus: 200000,
        type: ContractType.PERMNANENT,
    });

    const contract3: Contract = contractRepo.create({
        name: 'Contract 3',
        employee: employee3,
        start_date: new Date(),
        end_date: new Date(),
        salary: 3000000,
        bonus: 300000,
        type: ContractType.PERMNANENT,
    });

    await contractRepo.save([contract1, contract2, contract3]);
    console.log('Contract created');
    //endregion

    //region Image
    const imageRepo = AppDataSource.getRepository(Image);

    const image1 = imageRepo.create({
        id: "a4392290-15c6-4f15-bd2a-aca9d2b8ef42",
        name: "sample.png",
        path: "a4392290-15c6-4f15-bd2a-aca9d2b8ef42.png",
        height: 100,
        width: 100,
    });
    await imageRepo.save(image1);

    const image2 = imageRepo.create({
        id: "a1f49fb4-6ad8-4e07-99e8-d5d9893a985c",
        name: "sample2.png",
        path: "a1f49fb4-6ad8-4e07-99e8-d5d9893a985c.png",
        height: 100,
        width: 100,
    });
    await imageRepo.save(image2);

    const images = await Promise.all([
        '2930ce29-27c3-4ec7-9dcb-343911559f5a',
        'a163bf15-3ee7-4db7-b9f9-02dee0423f35',
        '6afc5d1e-0383-45aa-a92f-29825a7008ab',
        '64558f9e-2325-4ca4-8307-62158ae8f0f2',
        'bd61dc3b-b2be-46a3-8389-5a051ab737d9',
        '87126613-a7ff-4278-8c06-cd40ace3db5c',
        '3461f81d-24f5-4247-aa3d-6bf348cd2ca3',
        '03f0f504-16cf-4f80-b4bc-ba09d8bcc1d0',
        '7327feb4-108b-4067-85ac-1913c76602ba',
        '299313f9-d6d8-4513-843f-834181771684',
        '025532b0-9d2c-4e1c-90a6-25285ccc73da'
    ].map(id => imageRepo.save(imageRepo.create({
        id: id,
        name: `${id}.png`,
        path: `${id}.png`,
        height: 100,
        width: 100,
    }))));
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
