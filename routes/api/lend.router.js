const {LendController} = require("../../controllers/lend.controller");
const router = require('express').Router();

router.get('/search', LendController.getLends);
router.get('/from/:user_id', LendController.getByUser);
router.get('/:lend_id', LendController.getLend);
router.post('/:lend_id'); //TODO:
router.delete('/:lend_id'); //TODO:

module.exports = router;
