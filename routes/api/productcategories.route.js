const router = require('express').Router();
const {ProductCategoriesController} = require('../../controllers/productcategories.controller');

router.get('/', ProductCategoriesController.getProductCategories);
router.get('/:id', ProductCategoriesController.getProductCategory);
router.post('/', ProductCategoriesController.addProductCategory);
router.patch('/:id', ProductCategoriesController.updateProductCategory);
router.delete('/:id', ProductCategoriesController.deleteProductCategory);

module.exports = router;
