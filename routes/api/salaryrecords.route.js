const router = require('express').Router();
const {SalaryReportController} = require('../../controllers/salaryrecords.controller');

router.get('/:year/:month', SalaryReportController.getSalaryRecords);

module.exports = router;
