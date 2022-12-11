const { PositionController } = require("../../controllers/position.controller");
const router = require("express").Router();

router.get('/search', PositionController.getAll);
router.get('/:position_id(\\d+)', PositionController.getOne);
router.patch('/:position_id(\\d+)', PositionController.save);
router.post('/', PositionController.save);
router.delete('/:position_id(\\d+)', PositionController.delete);

module.exports = router;
