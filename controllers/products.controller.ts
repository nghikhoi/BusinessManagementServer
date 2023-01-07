import {NextFunction, Request, Response} from "express";
import {OrderItemRepository} from "../repositories/bill.repository";
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
import {MoreThan} from "typeorm";

export class ProductsController {

	static async deleteProduct(req: Request, res: Response, next: NextFunction) {
		const id: number = +req.params.id;
		const result = await ProductRepository.delete(id);
		return res.json(result);
	}

	static async getCategories(req: Request, res: Response, next: NextFunction) {
		const result = await ProductCategoryRepository.find();
		return res.json(result);
	}

	static async getProduct(req: Request, res: Response, next: NextFunction) {
		const id: number = +req.params.id;
		const result = await ProductRepository.findOne({
			where: {
				id: id
			},
			relations: ["category"]
		});
		return res.json(result);
	}

	static async getProducts(req: Request, res: Response, next: NextFunction) {
		const result = await ProductRepository.find({
			relations: ["category"]
		});
		return res.json(result);
	}

	static async getAvailableProducts(req: Request, res: Response, next: NextFunction) {
		const result = await ProductRepository.find({
			where: {
				stock: MoreThan(0)
			}
		});
		return res.json(result);
	}

	static async addProduct(req: Request, res: Response, next: NextFunction) {
		const product: any /*Product*/ = req.body;
		const result = await ProductRepository.save(product);
		return res.json(result);
	}

	static async updateProduct(req: Request, res: Response, next: NextFunction) {
		const productId: number = +req.params.id;
		const product: any /*Product*/ = req.body;
		const result = await ProductRepository.update(productId, product);
		return res.json(result);
	}

}
