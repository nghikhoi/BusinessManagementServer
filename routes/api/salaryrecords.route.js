const router = require('express').Router();
const {SalaryRecordsController} = require('../../controllers/salaryrecords.controller');

router.get('/', SalaryRecordsController.getSalaryRecords);

module.exports = router;
