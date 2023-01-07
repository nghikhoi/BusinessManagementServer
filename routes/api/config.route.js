const router = require('express').Router();
const {ConfigController} = require('../../controllers/config.controller');

router.get('/', ConfigController.loadConfig);
router.patch('/', ConfigController.saveConfig);

module.exports = router;
