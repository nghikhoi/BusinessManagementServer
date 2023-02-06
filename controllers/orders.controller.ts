import {NextFunction, Request, Response} from "express";
import {OrderItemRepository, OrderRepository} from "../repositories/bill.repository";
import {ProductRepository} from "../repositories/product.repository";
import {EmployeesController} from "./employees.controller";
import {CustomersController} from "./customers.controller";
import {Order, OrderItem, OrderStatus} from "../models/order";
import {DiscountType} from "../models/voucher";
import {ConfigController} from "./config.controller";
import {CustomerRepository} from "../repositories/customer.repository";

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

        order['total_amount'] = order['net_price'] + order['net_price'] * order.vat_rate / 100;
    }

    static async deleteOrder(req: Request, res: Response, next: NextFunction) {
        const id: number = +req.params.id;
        const result = await OrderRepository.delete(id);
        return res.json(result);
    }

    static async getTodayOrders() {
        const result = await OrderRepository.createQuery().where('DATE(created_at) = CURDATE()').getMany();

        await Promise.all(result.map(async (order) => {
            await OrdersController.postOrder(order);
        }));

        return result;
    }

    static async getOrderByMonth(month: number, year: number) {
        const result = await OrderRepository.createQuery().where('MONTH(created_at) = :month AND YEAR(created_at) = :year', {
            month,
            year
        }).getMany();

        await Promise.all(result.map(async (order) => {
            await OrdersController.postOrder(order);
        }));

        return result;
    }

    static async getOrdersByStatus(status: OrderStatus) {
        const result = await OrderRepository.createQuery()
            .where('order.status = :status', {status})
            .getMany();

        await Promise.all(result.map(async (order) => {
            await OrdersController.postOrder(order);
        }));

        return result;
    }

    static async getOrder(req: Request, res: Response, next: NextFunction) {
        const id: number = +req.params.id;
        const result = await OrderRepository.createQuery().where('order.id = :id', {id}).getOne();

        await OrdersController.postOrder(result);

        return res.json(result);
    }

    static async getOrders(req: Request, res: Response, next: NextFunction) {
        const result = await OrderRepository.createQuery().getMany();

        await Promise.all(result.map(async (order) => {
            await OrdersController.postOrder(order);
        }));

        return res.json(result);
    }

    static async addOrder(req: Request, res: Response, next: NextFunction) {
        const order: any /*Order*/ = req.body;

        const config = await ConfigController.getConfig();

        order.vat_rate = config.vat_rate;
        if (!order.create_employee || !order.create_employee_id) {
            order.create_employee_id = req.user['id'];
        }

        if (order.customer) {
            const customer_id = order.customer.id;
            const customer = customer_id ? await CustomersController.getCustomerById(customer_id) : null;

            if (!customer) {
                order.customer.id = undefined;
                const result = await CustomerRepository.save(order.customer);

                order.customer_id = result.id;
                order.customer = undefined;
            }
        }

        const itemsTemp = order.items;
        order.items = [];

        const orderEntity = await OrderRepository.save(order);

        const items = await Promise.all(itemsTemp.map(async (item) => {
            item.order_id = orderEntity.id;
            return await OrderItemRepository.save(item);
        }));

        for (const item of items) {
            const quantity = item.quantity;
            const product = await ProductRepository.findOne({
                where: {
                    id: item.product_id
                }
            });

            if (product) {
                product.stock -= quantity;
                await ProductRepository.save(product);
            }
        }

		orderEntity.items = items;

        return res.json(orderEntity);
    }

    static async updateOrder(req: Request, res: Response, next: NextFunction) {
        const orderId: number = +req.params.id;
        const order: any /*Order*/ = req.body;

        // order.id = undefined;
		// order.items = undefined;

        const oldOrder = await OrderRepository.createQuery().where('order.id = :id', {id: orderId}).getOne();
        const oldStatus = oldOrder.status;

        // const newOrder = OrderRepository.merge(oldOrder, order);

        const temp = await OrderRepository.update(orderId, {
            status: order.status,
        });
        const result = await OrderRepository.createQuery().where('order.id = :id', {id: orderId}).getOne();
        const newStatus = result.status;

        if (newStatus != oldStatus && newStatus == OrderStatus.CANCELED) {
            for (const item of result.items) {
                const quantity = item.quantity;
                const product = await ProductRepository.findOne({
                    where: {
                        id: item.product_id
                    }
                });

                if (product) {
                    product.stock += quantity;
                    await ProductRepository.save(product);
                }
            }
        }

        return res.json(result);
    }

}
