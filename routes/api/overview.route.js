const router = require('express').Router();
const {OverviewController} = require('../../controllers/overview.controller');

router.get('/', OverviewController.getOverview);

module.exports = router;
