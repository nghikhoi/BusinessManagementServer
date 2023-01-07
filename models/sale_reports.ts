import { Customer } from './customer';
import { Employee } from './employee';
import { Product, ProductCategory } from './product';
export class ProductCategoryStats {

    category: ProductCategory;

    quantity_sold: number;

}

export class ProductStats {

    product: Product;

    quantity_sold: number;

    revenue: number;

}

export class CustomerStats {

    customer: Customer;

    num_of_orders: number;

    revenue: number;

}

export class EmployeeStats {

    employee: Employee;

    num_of_orders: number;

    revenue: number;

}

export class SalesStats {

    revenue_by_day: number[];

    total_revenue: number;

    avg_revenue: number;

    avg_num_of_orders_per_employee: number;

    num_of_orders_completed: number;

    num_of_orders_canceled: number;

    num_of_orders_returned: number;

    num_of_orders_made: number;

    product_category_stats: ProductCategoryStats[];

    product_stats: ProductStats[];

    customer_stats: CustomerStats[];

    employee_stats: EmployeeStats[];

}
