const router = require('express').Router();
const {CustomersController} = require('../../controllers/customers.controller');

router.get('/', CustomersController.getCustomers);
router.get('/:id', CustomersController.getCustomer);
router.post('/', CustomersController.addCustomer);
router.patch('/:id', CustomersController.updateCustomer);
router.delete('/:id', CustomersController.deleteCustomer);

module.exports = router;
