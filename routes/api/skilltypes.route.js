const router = require('express').Router();
const {SkillTypesController} = require('../../controllers/skilltypes.controller');

router.get('/', SkillTypesController.getSkillTypes);
router.get('/:id', SkillTypesController.getSkillType);
router.post('/', SkillTypesController.addSkillType);
router.patch('/:id', SkillTypesController.updateSkillType);
router.delete('/:id', SkillTypesController.deleteSkillType);

module.exports = router;
