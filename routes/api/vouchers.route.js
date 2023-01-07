const router = require('express').Router();
const {VouchersController} = require('../../controllers/vouchers.controller');

router.get('/', VouchersController.getVouchers);
router.get('/:code', VouchersController.getVoucher);
router.post('/', VouchersController.createVouchers);
router.delete('/', VouchersController.deleteVouchers);

module.exports = router;
