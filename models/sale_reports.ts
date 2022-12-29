import { Customer } from './customer';
import { Employee } from './employee';
import { Product, ProductCategory } from './product';
export class ProductCategoryStats {

    category: ProductCategory;

    quantitySold: number;

}

export class ProductStats {

    product: Product;

    quantitySold: number;

    revenue: number;

}

export class CustomerStats {

    customer: Customer;

    numOfOrders: number;

    revenue: number;

}

export class EmployeeStats {

    employee: Employee;

    numOfOrders: number;

    revenue: number;

}

export class SalesStats {
    
    revenueByDay: number[];

    totalRevenue: number;

    avgRevenue: number;

    avgNumOfORdersPerEmployee: number;

    numOfOrdersCompleted: number;

    numOfOrdersCanceled: number;

    numOfOrdersReturned: number;

    numOfOrdersMade: number;

    productCategroyStats: ProductCategoryStats[];

    productStats: ProductStats[];

    customerStats: CustomerStats[];

    employeeStats: EmployeeStats[];

}