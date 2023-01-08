const express = require('express');
const {verifyToken} = require('../auth/auth.middleware');
const router = express.Router();

router.use(verifyToken);

router.use('/bonuses', require('./bonusrecords.route'));
router.use('/bonus-types', require('./bonustypes.route'));
router.use('/config', require('./config.route'));
router.use('/contract-types', require('./contracttypes.route'));
router.use('/customers', require('./customers.route'));
router.use('/departments', require('./departments.route'));
router.use('/employees', require('./employees.route'));
router.use('/orders', require('./orders.route'));
router.use('/overview', require('./overview.route'));
router.use('/overtime', require('./overtimerecords.route'));
router.use('/positions', require('./positions.route'));
router.use('/product-categories', require('./productcategories.route'));
router.use('/products', require('./products.route'));
router.use('/providers', require('./providers.route'));
router.use('/salary', require('./salaryrecords.route'));
router.use('/skill-ratings', require('./skillrecords.route'));
router.use('/skill-types', require('./skilltypes.route'));
router.use('/sales-reports', require('./salereport.route'));
router.use('/vouchers', require('./vouchers.route'));
router.use('/voucher-types', require('./vouchertypes.route'));

module.exports = router;
