const router = require('express').Router();
const {VoucherTypesController} = require('../../controllers/vouchertypes.controller');

router.get('/', VoucherTypesController.getVoucherTypes);
router.get('/:id', VoucherTypesController.getVoucherType);
router.post('/', VoucherTypesController.addVoucherType);
router.patch('/:id', VoucherTypesController.updateVoucherType);
router.delete('/:id', VoucherTypesController.deleteVoucherType);

module.exports = router;
