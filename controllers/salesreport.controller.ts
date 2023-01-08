import {NextFunction, Request, Response} from "express";
import {CustomerStats, EmployeeStats, ProductCategoryStats, ProductStats, SalesStats} from "../models/sale_reports";
import {OrdersController} from "./orders.controller";
import {OrderStatus} from "../models/order";
import {ProductCategory} from "../models/product";
import {ProductCategoryRepository, ProductRepository} from "../repositories/product.repository";
import {CustomersController} from "./customers.controller";
import {EmployeesController} from "./employees.controller";

export class SalesReportController {

    static async getSalesReportBy(month: number, year: number) {
        const result: SalesStats = new SalesStats();

        const monthOrders = await OrdersController.getOrderByMonth(month, year);

        {
            const orderGroupByDay = [];
            monthOrders.forEach(order => {
                if (order.status != OrderStatus.COMPLETED) {
                    return;
                }
                const day = order.created_at.getDate();
                if (orderGroupByDay[day] === undefined) {
                    orderGroupByDay[day] = [];
                }
                orderGroupByDay[day].push(order);
            });
            result.revenue_by_day = orderGroupByDay.map(orders => {
                if (orders === undefined || !orders) {
                    return 0;
                }
                let total = 0;
                orders.forEach(order => {
                    total += order['net_price'];
                });
                return total;
            });

            for (let i = 0; i < result.revenue_by_day.length; i++) {
                if (result.revenue_by_day[i] === undefined || !result.revenue_by_day[i]) {
                    result.revenue_by_day[i] = 0;
                }
            }
        }

        result.total_revenue = 0;
        monthOrders.forEach(order => {
            if (order.status != OrderStatus.COMPLETED) {
                return;
            }
            result.total_revenue += order['net_price'];
        });

        result.avg_revenue = result.total_revenue / monthOrders.length;

        result.avg_num_of_orders_per_employee = 0;
        {
            const distinctEmployees = monthOrders.map(order => order.create_employee_id)
                .filter((value, index, self) => self.indexOf(value) === index);
            result.avg_num_of_orders_per_employee = monthOrders.length / distinctEmployees.length;
        }

        {
            result.num_of_orders_canceled = 0;
            result.num_of_orders_completed = 0;
            result.num_of_orders_returned = 0;

            monthOrders.forEach(order => {
                if (order.status == OrderStatus.CANCELED) {
                    result.num_of_orders_canceled++;
                } else if (order.status == OrderStatus.COMPLETED) {
                    result.num_of_orders_completed++;
                } else if (order.status == OrderStatus.RETURNED) {
                    result.num_of_orders_returned++;
                }
            });
        }

        {
            result.num_of_orders_made = monthOrders.length;
        }

        {
            const categories = (await ProductCategoryRepository.find()).map(category => {
                const stats = new ProductCategoryStats();
                stats.category = category;
                stats.quantity_sold = 0;
                return stats;
            });

            monthOrders.forEach(order => {
                if (order.status != OrderStatus.COMPLETED) {
                    return;
                }
                order.items.forEach(item => {
                    const category = categories.find(category => category.category.id === item.product.category_id);
                    category.quantity_sold += item.quantity;
                });
            });

            result.product_category_stats = categories;
        }

        {
            const product_stats = (await ProductRepository.find()).map(product => {
                const stats = new ProductStats();
                stats.product = product;
                stats.quantity_sold = 0;
                stats.revenue = 0;
                return stats;
            })

            monthOrders.forEach(order => {
                if (order.status != OrderStatus.COMPLETED) {
                    return;
                }
                order.items.forEach(item => {
                    const product = product_stats.find(product => product.product.id === item.product_id);
                    product.quantity_sold += item.quantity;
                    product.revenue += item.quantity * item.product.price;
                });
            });

            result.product_stats = product_stats;
        }

        {
            const distinctCustomerIds = monthOrders.map(order => order.customer_id)
                .filter((value, index, self) => self.indexOf(value) === index);
            const distinctCustomers = (await Promise.all(distinctCustomerIds.map(id => CustomersController.getCustomerById(id))))
                .map(customer => {
                    const stats = new CustomerStats();
                    stats.customer = customer;
                    stats.num_of_orders = 0;
                    stats.revenue = 0;
                    return stats;
                });

            monthOrders.forEach(order => {
                const customer = distinctCustomers.find(customer => customer.customer.id === order.customer_id);
                customer.num_of_orders++;
                if (order.status != OrderStatus.COMPLETED) {
                    return;
                }
                customer.revenue += order['net_price'];
            });

            result.customer_stats = distinctCustomers;
        }

        {
            const distinctEmployeeIds = monthOrders.map(order => order.create_employee_id)
                .filter((value, index, self) => self.indexOf(value) === index);
            const distinctEmployees = (await Promise.all(distinctEmployeeIds.map(id => EmployeesController.getEmployeeById(id))))
                .map(employee => {
                    const stats = new EmployeeStats();
                    stats.employee = employee;
                    stats.num_of_orders = 0;
                    stats.revenue = 0;
                    return stats;
                });

            monthOrders.forEach(order => {
                const employee = distinctEmployees.find(employee => employee.employee.id === order.create_employee_id);
                employee.num_of_orders++;
                if (order.status != OrderStatus.COMPLETED) {
                    return;
                }
                employee.revenue += order['net_price'];
            });

            result.employee_stats = distinctEmployees;
        }

        return result;
    }

    static async getSalesReport(req: Request, res: Response, next: NextFunction) {
        const year: number = +req.params.year;
        const month: number = +req.params.month;
        const result = await SalesReportController.getSalesReportBy(month, year);
        return res.json(result);
    }

}
