const router = require('express').Router();
const {BonusTypesController} = require('../../controllers/bonustypes.controller');

router.get('/', BonusTypesController.getBonusTypes);
router.get('/:id', BonusTypesController.getBonusType);
router.post('/', BonusTypesController.addBonusType);
router.patch('/:id', BonusTypesController.updateBonusType);
router.delete('/:id', BonusTypesController.deleteBonusType);

module.exports = router;
