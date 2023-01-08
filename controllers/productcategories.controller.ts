import {NextFunction, Request, Response} from "express";
import {OrderItemRepository} from "../repositories/bill.repository";
import {ContractRepository, ContractTypeRepository} from "../repositories/contract.repository";
import {CustomerRepository} from "../repositories/customer.repository";
import {DepartmentRepository} from "../repositories/department.repository";
import {ImageRepository, VideoRepository} from "../repositories/file.repository";
import {EmployeeRepository, SkillRecordRepository} from "../repositories/employee.repository";
import {PositionRepository} from "../repositories/position.repository";
import {ProductCategoryRepository, ProductRepository} from "../repositories/product.repository";
import {ProviderRepository} from "../repositories/provider.repository";
import {SkillRepository} from "../repositories/skill.repository";
import {
    OvertimeRecordRepository,
    PositionRecordRepository,
    SalaryRecordRepository
} from "../repositories/salary.repository";
import {VoucherRepository, VoucherTypeRepository} from "../repositories/voucher.repository";
import {BonusRecordRepository, BonusTypeRepository} from "../repositories/bonus.repository";

export class ProductCategoriesController {

	static async deleteProductCategory(req: Request, res: Response, next: NextFunction) {
		const id: number = +req.params.id;
		const result = await ProductCategoryRepository.delete(id);
		return res.json(result);
	}

	static async getProductCategory(req: Request, res: Response, next: NextFunction) {
		const id: number = +req.params.id;
		const result = await ProductCategoryRepository.findOne({
			where: {
				id: id
			}
		});
		return res.json(result);
	}

	static async getProductCategories(req: Request, res: Response, next: NextFunction) {
		const result = await ProductCategoryRepository.find();
		return res.json(result);
	}

	static async addProductCategory(req: Request, res: Response, next: NextFunction) {
		const productCategory: any /*ProductCategory*/ = req.body;
		const result = await ProductCategoryRepository.save(productCategory);
		return res.json(result);
	}

	static async updateProductCategory(req: Request, res: Response, next: NextFunction) {
		const productCategoryId: number = +req.params.id;
		const productCategory: any /*ProductCategory*/ = req.body;
		const result = await ProductCategoryRepository.update(productCategoryId, productCategory);
		return res.json(result);
	}

}
