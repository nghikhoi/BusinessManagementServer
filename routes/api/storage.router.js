const {StorageController} = require("../../controllers/storage.controller");
const router = require('express').Router();

router.get('/import', StorageController.searchImport);
router.post('/import', StorageController.import);

router.get('/export', StorageController.searchExport);
router.post('/export/from/:bill_id', StorageController.exportFromBill);
router.post('/export', StorageController.export);

module.exports = router;