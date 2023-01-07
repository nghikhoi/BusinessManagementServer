import {NextFunction, Request, Response} from "express";
import {OrderItemRepository, OrderRepository} from "../repositories/bill.repository";
import {ContractRepository, ContractTypeRepository} from "../repositories/contract.repository";
import {CustomerRepository} from "../repositories/customer.repository";
import {DepartmentRepository} from "../repositories/department.repository";
import {ImageRepository, VideoRepository} from "../repositories/file.repository";
import {EmployeeRepository, SkillRepository} from "../repositories/employee.repository";
import {PositionRepository} from "../repositories/position.repository";
import {ProductCategoryRepository, ProductRepository} from "../repositories/product.repository";
import {ProviderRepository} from "../repositories/provider.repository";
import {SkillTypeRepository} from "../repositories/skill.repository";
import {
    OvertimeRecordRepository,
    PositionRecordRepository,
    SalaryRecordRepository
} from "../repositories/salary.repository";
import {VoucherRepository, VoucherTypeRepository} from "../repositories/voucher.repository";
import {BonusRecordRepository, BonusTypeRepository} from "../repositories/bonus.repository";
import {EmployeesController} from "./employees.controller";
import {CustomersController} from "./customers.controller";
import {Order} from "../models/order";
import {DiscountType} from "../models/voucher";

export class OrdersController {

	static discountTypeToBeSorted = [DiscountType.AMOUNT, DiscountType.PERCENTAGE];

	private static async postOrder(order: Order) {
		order.create_employee = await EmployeesController.getEmployeeById(order.create_employee_id);
		order.customer = await CustomersController.getCustomerById(order.customer_id);

		order['total_price'] = 0;
		order.items.forEach(item => {
			order['total_price'] += item.unit_price * item.quantity;
		});

		order['net_price'] = order['total_price'];
		order.applied_vouchers.sort((a, b) => {
			return OrdersController.discountTypeToBeSorted.indexOf(a.voucher_type.discount_type) - OrdersController.discountTypeToBeSorted.indexOf(b.voucher_type.discount_type);
		}).forEach(voucher => {
			if (voucher.voucher_type.discount_type === DiscountType.AMOUNT) {
				order['net_price'] -= voucher.voucher_type.discount;
			} else {
				order['net_price'] -= order['net_price'] * voucher.voucher_type.discount / 100;
			}
		});

		order['total_amount'] = order['net_price'] - order['net_price'] * order.vat_rate / 100;
	}

	static async deleteOrder(req: Request, res: Response, next: NextFunction) {
		const id: number = +req.params.id;
		const result = await OrderRepository.delete(id);
		return res.json(result);
	}

	static async getTodayOrders() {
		const result = await OrderRepository.createQuery().where('DATE(create_date) = CURDATE()').getMany();

		await Promise.all(result.map(async (order) => {
			await this.postOrder(order);
		}));

		return result;
	}

	static async getOrderByMonth(month: number, year: number) {
		const result = await OrderRepository.createQuery().where('MONTH(create_date) = :month AND YEAR(create_date) = :year', {month, year}).getMany();

		await Promise.all(result.map(async (order) => {
			await this.postOrder(order);
		}));

		return result;
	}

	static async getOrder(req: Request, res: Response, next: NextFunction) {
		const id: number = +req.params.id;
		const result = await OrderRepository.createQuery().where('id = :id', {id}).getOne();

		await this.postOrder(result);

		return res.json(result);
	}

	static async getOrders(req: Request, res: Response, next: NextFunction) {
		const result = await OrderRepository.createQuery().getMany();

		await Promise.all(result.map(async (order) => {
			await this.postOrder(order);
		}));

		return res.json(result);
	}

	static async addOrder(req: Request, res: Response, next: NextFunction) {
		const order: any /*Order*/ = req.body;
		const result = await OrderRepository.save(order);
		return res.json(result);
	}

	static async updateOrder(req: Request, res: Response, next: NextFunction) {
		const orderId: number = +req.params.id;
		const order: any /*Order*/ = req.body;
		const result = await OrderRepository.update(orderId, order);
		return res.json(result);
	}

}
