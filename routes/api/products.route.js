const router = require('express').Router();
const {ProductsController} = require('../../controllers/products.controller');

router.get('/', ProductsController.getProducts);
router.get('/:id', ProductsController.getProduct);
router.post('/', ProductsController.addProduct);
router.patch('/:id', ProductsController.updateProduct);
router.delete('/:id', ProductsController.deleteProduct);

module.exports = router;
