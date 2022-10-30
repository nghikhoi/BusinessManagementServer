const {BillController} = require("../../controllers/bill.controller");
const router = require('express').Router();

router.get('/from/:user_id', BillController.getByUser);
router.get('/search', BillController.search)
router.get('/:bill_id(\\d+)/vouchers', BillController.getVouchers); //List<VoucherProfile>
router.get('/:bill_id(\\d+)', BillController.getBill);
router.post('/:bill_id(\\d+)', BillController.updateBillStatus);

module.exports = router;
