const router = require('express').Router();
const {BonusRecordsController} = require('../../controllers/bonusrecords.controller');

router.get('/:month/:year', BonusRecordsController.getBonusRecords);
router.post('/:month/:year', BonusRecordsController.updateBonusRecords);

module.exports = router;
