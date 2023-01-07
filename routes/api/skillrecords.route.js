const router = require('express').Router();
const {SkillRecordsController} = require('../../controllers/skillrecords.controller');

router.get('/', SkillRecordsController.getSkillOverviews);
router.get('/:id', SkillRecordsController.getSkillDetails);
router.post('/:id', SkillRecordsController.updateSkills);

module.exports = router;
