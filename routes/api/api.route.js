const express = require('express');
const {verifyToken} = require("../auth/auth.middleware");
const router = express.Router();

router.use(verifyToken);
router.use('/employee', require('./employee.router'));
router.use('/customer', require('./customer.router'));
router.use('/department', require('./department.router'));
router.use('/bill', require('./bill.router'));
router.use('/voucher', require('./voucher.router'));
router.use('/product', require('./product.router'));
router.use('/provider', require('./provider.router'));
router.use('/message', require('./message.router'));

module.exports = router;
