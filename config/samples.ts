import {Employee, Gender} from '../models/employee';
import {init} from "../variables/run.variable";
import {EmployeeRepository} from "../repositories/employee.repository";
import {ContractRepository} from "../repositories/contract.repository";
import {ConfigController} from "../controllers/config.controller";
import {PositionRecordRepository} from "../repositories/salary.repository";
import {DepartmentRepository} from "../repositories/department.repository";
import {CustomerRepository} from "../repositories/customer.repository";
import {ProviderRepository} from "../repositories/provider.repository";
import {ProductCategoryRepository, ProductRepository} from "../repositories/product.repository";
import {VoucherTypeRepository} from "../repositories/voucher.repository";
import {DiscountType} from "../models/voucher";
import {OrderItemRepository, OrderRepository} from "../repositories/bill.repository";
import {SkillRepository} from "../repositories/skill.repository";
import {OrderStatus} from "../models/order";
import {Customer} from "../models/customer";

async function randomOrderItem(order_id: number, min_amount: number = 1, max_amount: number = 5) {
    const products = await ProductRepository.find();
    const items = [];

    const amount = Math.floor(Math.random() * (max_amount - min_amount + 1)) + min_amount;

    for (let i = 0; i < amount && products.length > 0; i++) {
        let productIndex = Math.floor(Math.random() * products.length);
        const product = products[productIndex];
        products.splice(productIndex, 1);

        items.push({
            order_id: order_id,
            product_id: product.id,
            quantity: Math.floor(Math.random() * 10) + 1,
            unit_price: product.price,
        });
    }
    return await OrderItemRepository.save(items);
}

function randomDateBetween(start: Date, end: Date) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

async function randomOrder(random_customers: Customer[], random_employees: Employee[], random_address: string[]
                           , random_bank: string[], random_status: OrderStatus[]
                           , random_start_date: Date, random_end_date: Date, amount: number = 10) {
    const orders = [];
    for (let i = 0; i < amount; i++) {
        const customerIndex = Math.floor(Math.random() * random_customers.length);
        const customer = random_customers[customerIndex];
        const employeeIndex = Math.floor(Math.random() * random_employees.length);
        const employee = random_employees[employeeIndex];
        const addressIndex = Math.floor(Math.random() * random_address.length);
        const address = random_address[addressIndex];
        const bankIndex = Math.floor(Math.random() * random_bank.length);
        const bank = random_bank[bankIndex];
        const statusIndex = Math.floor(Math.random() * random_status.length);
        const status = random_status[statusIndex];
        const created_at = randomDateBetween(random_start_date, random_end_date);

        let completed_at = null;
        if (status == OrderStatus.COMPLETED) {
            completed_at = randomDateBetween(created_at, random_end_date);
        }

        const order = await OrderRepository.save({
            customer_id: customer.id,
            create_employee_id: employee.id,
            address: address,
            bank: bank,
            status: status,
            vat_rate: 10,
            created_at: created_at,
            completed_at: completed_at,
        });
        orders.push(order);

        await randomOrderItem(order.id);
    }
    return orders;
}

function randomPhoneNumber() {
    let phone = '';
    for (let i = 0; i < 10; i++) {
        phone += Math.floor(Math.random() * 10);
    }
    return phone;
}

function randomCitizenId() {
    let id = '';
    for (let i = 0; i < 12; i++) {
        id += Math.floor(Math.random() * 10);
    }
    return id;
}

async function InitCommon() {
    console.log(await OrderRepository.createQuery().getMany());
    const employee = await EmployeeRepository.findOneByUser('admin');

    console.log("employee: ", employee);

    if (!employee) {
        let admin = EmployeeRepository.create({
            username: 'admin',
            password: 'admin',
            name: 'Admin',
            address: 'Admin',
            birthday: new Date(),
            citizen_id: randomCitizenId(),
            email: 'admin@localhost',
            gender: Gender.OTHER,
            phone: randomPhoneNumber()
        })

        admin = await EmployeeRepository.save(admin);

        const dumpContract = ContractRepository.create({
            employee_id: admin.id,
            name: 'Demo',
            start_date: new Date(),
            end_date: new Date(),
            type_id: 1,
        });
        await ContractRepository.save(dumpContract);

        const infiniteContract = ContractRepository.create({
            employee_id: admin.id,
            name: 'Infinite Contract',
            start_date: new Date(),
            end_date: new Date(3000, 1, 1),
            type_id: 1
        });

        await ContractRepository.save(infiniteContract);

        const testPositionRecord = await PositionRecordRepository.save({
            employee_id: admin.id,
            start_date: new Date(),
            end_date: new Date(),
            position_id: 2
        });

        const adminPositionRecord = await PositionRecordRepository.save({
            employee_id: admin.id,
            start_date: new Date(),
            end_date: new Date(3000, 1, 1),
            position_id: 1
        });

        console.log('Admin created');

        const globalDepartment = await DepartmentRepository.save({
            name: 'Global',
            head_employee_id: admin.id,
            phone_number: randomPhoneNumber(),
        });

        console.log('Global department created');

        const hrManager = EmployeeRepository.create({
            username: 'hr',
            password: '123',
            name: 'Nguyễn Văn Nhân Sự',
            address: 'Resource Address',
            birthday: new Date(),
            citizen_id: randomCitizenId(),
            email: 'hr@localhost',
            gender: Gender.MALE,
            phone: randomPhoneNumber()
        });
        await EmployeeRepository.save(hrManager);

        const hrManagerPositionRecord = await PositionRecordRepository.save({
            employee_id: hrManager.id,
            start_date: new Date(),
            end_date: new Date(3000, 1, 1),
            position_id: 2
        });

        const hrManagerContract = await ContractRepository.save({
            employee_id: hrManager.id,
            start_date: new Date(),
            end_date: new Date(2027, 1, 1),
            type_id: 4
        });

        const hrDepartment = await DepartmentRepository.save({
            name: 'Human Resource',
            head_employee_id: hrManager.id,
            phone_number: randomPhoneNumber()
        });

        const saleManager = EmployeeRepository.create({
            username: 'sale',
            password: '123',
            name: 'Nguyễn Thị Bán',
            address: 'Sale Address',
            birthday: new Date(),
            citizen_id: randomCitizenId(),
            email: 'sale@localhost',
            gender: Gender.FEMALE,
            phone: randomPhoneNumber()
        });
        await EmployeeRepository.save(saleManager);

        const saleManagerContract = await ContractRepository.save({
            employee_id: saleManager.id,
            start_date: new Date(),
            end_date: new Date(2027, 1, 1),
            type_id: 4
        });

        const saleManagerPositionRecord = await PositionRecordRepository.save({
            employee_id: saleManager.id,
            start_date: new Date(),
            end_date: new Date(3000, 1, 1),
            position_id: 3,
        });

        const saleDepartment = await DepartmentRepository.save({
            name: 'Sale Department',
            head_employee_id: saleManager.id,
            phone_number: randomPhoneNumber()
        });

        const saleEmployee1 = await EmployeeRepository.create({
            username: 'sale1',
            password: '123',
            name: 'Bành Văn Bán',
            address: 'Sale Address',
            birthday: new Date(),
            citizen_id: randomCitizenId(),
            email: 'sale1@localhost',
            gender: Gender.FEMALE,
            phone: randomPhoneNumber(),
            department_id: saleDepartment.id
        });
        await EmployeeRepository.save(saleEmployee1);

        const saleEmployee1Contract = await ContractRepository.save({
            employee_id: saleEmployee1.id,
            start_date: new Date(),
            end_date: new Date(2024, 1, 1),
            type_id: 4
        });

        const saleEmployee1PositionRecord = await PositionRecordRepository.save({
            employee_id: saleEmployee1.id,
            start_date: new Date(),
            end_date: new Date(3000, 1, 1),
            position_id: 4,
        });

        console.log('Sale department created');

        const productDepartment = await DepartmentRepository.save({
            name: 'Product',
            head_employee_id: admin.id,
            phone_number: randomPhoneNumber()
        });

        const customer1 = await CustomerRepository.save({
            name: 'Nguyễn Văn Tèo',
            address: 'Hà Nội',
            email: 'teo@gmail.com',
            birthday: new Date(),
            citizen_id: '123456789012',
            gender: Gender.MALE,
            phone: randomPhoneNumber()
        });

        const customer2 = await CustomerRepository.save({
            name: 'Nguyễn Thị Tí',
            address: 'Hồ Chí Minh',
            email: 'ti@gmail.com',
            birthday: new Date(),
            citizen_id: '123456789012',
            gender: Gender.FEMALE,
            phone: randomPhoneNumber()
        });

        const customer3 = await CustomerRepository.save({
            name: 'Nguyễn Văn Tùng',
            address: 'Hải Dương',
            email: 'tung@gmail.com',
            birthday: new Date(),
            citizen_id: '123456789012',
            gender: Gender.MALE,
            phone: randomPhoneNumber()
        });

        console.log('Customer created');

        const provider1 = await ProviderRepository.save({
            name: 'Công ty TNHH ABC',
            phone_number: randomPhoneNumber()
        });

        const provider2 = await ProviderRepository.save({
            name: 'Công ty TNHH XYZ',
            phone_number: randomPhoneNumber()
        });

        const provider3 = await ProviderRepository.save({
            name: 'Công ty TNHH DEF',
            phone_number: randomPhoneNumber(),
        });

        console.log('Provider created');

        const productCategory1 = await ProductCategoryRepository.save({
            name: 'Thực phẩm',
            description: 'Thực phẩm'
        });

        const productCategory2 = await ProductCategoryRepository.save({
            name: 'Đồ uống',
            description: 'Đồ uống',
        });

        const productCategory3 = await ProductCategoryRepository.save({
            name: 'Đồ ăn vặt',
            description: 'Đồ ăn vặt',
        });

        console.log('Product category created');

        const product_cate1_1 = await ProductRepository.save({
            name: 'Bánh mì',
            price: 15000,
            description: 'Bánh mì',
            category_id: productCategory1.id,
            provider_id: provider1.id,
            unit: 'Cái',
            stock: 30,
        });

        const product_cate1_2 = await ProductRepository.save({
            name: 'Bánh tráng trộn',
            price: 10000,
            description: 'Bánh tráng',
            category_id: productCategory1.id,
            provider_id: provider1.id,
            unit: 'Bịch',
            stock: 10,
        });

        const product_cate2_1 = await ProductRepository.save({
            name: 'Sữa tươi',
            price: 6000,
            provider_id: provider1.id,
            category_id: productCategory2.id,
            unit: 'Hộp',
            stock: 20,
            description: 'Sữa tươi ABC',
        });

        const product_cate2_2 = await ProductRepository.save({
            name: 'Sữa chua',
            price: 8000,
            provider_id: provider2.id,
            category_id: productCategory2.id,
            unit: 'Hộp',
            stock: 40,
            description: 'Sữa chua XYZ',
        });

        const product_cate3_1 = await ProductRepository.save({
            name: 'Kẹo',
            price: 35000,
            provider_id: provider3.id,
            category_id: productCategory3.id,
            unit: 'Hộp',
            stock: 15,
            description: 'Kẹo DEF',
        });

        const product_cate3_2 = await ProductRepository.save({
            name: 'Bánh quy',
            price: 65000,
            provider_id: provider3.id,
            category_id: productCategory3.id,
            unit: 'Hộp',
            stock: 30,
            description: 'Bánh quy DEF'
        });

        console.log('Product created');

        const voucherType1 = await VoucherTypeRepository.save({
            name: 'Giảm giá 10%',
            description: 'Giảm giá',
            discount_type: DiscountType.PERCENTAGE,
            discount: 10,
        });

        const voucherType2 = await VoucherTypeRepository.save({
            name: 'Giảm giá 20%',
            description: 'Giảm giá',
            discount_type: DiscountType.PERCENTAGE,
            discount: 20,
        });

        const voucherType3 = await VoucherTypeRepository.save({
            name: 'Giảm giá 10k',
            description: 'Giảm giá',
            discount_type: DiscountType.AMOUNT,
            discount: 10000,
        });

        console.log('Voucher type created');

        const skillType1 = await SkillRepository.save({
            name: 'Word',
            description: 'Sử dụng Word',
        });

        const skillType2 = await SkillRepository.save({
            name: 'Excel',
            description: 'Sử dụng Excel',
        });

        const skillType3 = await SkillRepository.save({
            name: 'PowerPoint',
            description: 'Sử dụng PowerPoint',
        });

        console.log('Skill type created');

        await randomOrder([customer1, customer2, customer3], [admin, saleEmployee1],
            ["Hải Dương", "Hà Nội", "Hồ Chí Minh", "Thủ Đức"],
            ['Vietcombank', 'Techcombank', 'Vietinbank', 'ACB'],
            [OrderStatus.CANCELED, OrderStatus.PENDING, OrderStatus.COMPLETED, OrderStatus.RETURNED],
            new Date(2023, 0, 1), new Date(2023, 2, 20), 30);
    }
}

export async function InitSamples() {
    console.log('Initializing database...');

    await ConfigController.initConfig();
    await ConfigController.initContractTypes();
    await ConfigController.initPosition();
    await ConfigController.initBonusType();

    if (!init) {
        console.log('Database already initialized.');
        return;
    }
    console.log('Sample initializing...');

    await InitCommon();

    console.log('Samples initialized');
}
