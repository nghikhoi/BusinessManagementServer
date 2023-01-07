const router = require('express').Router();
const {OrdersController} = require('../../controllers/orders.controller');

router.get('/', OrdersController.getOrders);
router.get('/:id', OrdersController.getOrder);
router.post('/', OrdersController.addOrder);
router.patch('/:id', OrdersController.updateOrder);
router.delete('/:id', OrdersController.deleteOrder);

module.exports = router;
