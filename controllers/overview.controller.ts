import {NextFunction, Request, Response} from "express";
import {OrderRepository} from "../repositories/bill.repository";
import {ProductRepository} from "../repositories/product.repository";
import {EmployeesController} from "./employees.controller";
import {CustomersController} from "./customers.controller";
import {OrdersController} from "./orders.controller";
import {OrderStatus} from "../models/order";

export class OverviewController {

	static async getOverview(req: Request, res: Response, next: NextFunction) {
		const result = {};

		const pendingOrders = await OrdersController.getOrdersByStatus(OrderStatus.PENDING);

		await Promise.all(pendingOrders.map(async (order) => {
			order.create_employee = await EmployeesController.getEmployeeById(order.create_employee_id);
			order.customer = await CustomersController.getCustomerById(order.customer_id);
		}));

		const totalStock = (await ProductRepository.createQueryBuilder("product")
			.select("SUM(product.stock)", "totalStock")
			.getRawOne()).totalStock;

		const todayOrders = await OrdersController.getTodayOrders();
		let todayRevenue = 0;

		todayOrders.forEach((order) => {
			if (order.status != OrderStatus.COMPLETED) {
				return;
			}
			todayRevenue += order['net_price'];
		});

		result['pending_orders'] = pendingOrders;
		result['num_of_pending_orders'] = pendingOrders.length;
		result['total_stock'] = totalStock;
		result['today_revenue'] = todayRevenue;

		return res.json(result);
	}

}
