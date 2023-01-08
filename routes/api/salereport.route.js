const router = require('express').Router();
const {SalesReportController} = require('../../controllers/salesreport.controller');

router.get('/:month/:year', SalesReportController.getSalesReport);

module.exports = router;
