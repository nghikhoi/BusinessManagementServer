const router = require('express').Router();
const {OvertimeRecordsController} = require('../../controllers/overtimerecords.controller');

router.get('/', OvertimeRecordsController.getOvertimeOverviews);
router.get('/:employee_id/:year/:month', OvertimeRecordsController.getOvertimeDetails);
router.post('/:employee_id/:year/:month', OvertimeRecordsController.updateOvertimeRecords);

module.exports = router;
