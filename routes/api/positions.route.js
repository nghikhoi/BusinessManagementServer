const router = require('express').Router();
const {PositionsController} = require('../../controllers/positions.controller');

router.get('/', PositionsController.getPositions);
router.get('/:id', PositionsController.getPosition);
router.post('/', PositionsController.addPosition);
router.patch('/:id', PositionsController.updatePosition);
router.delete('/:id', PositionsController.deletePosition);

module.exports = router;
