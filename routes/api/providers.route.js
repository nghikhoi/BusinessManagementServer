const router = require('express').Router();
const {ProvidersController} = require('../../controllers/providers.controller');

router.get('/', ProvidersController.getProviders);
router.get('/:id', ProvidersController.getProvider);
router.post('/', ProvidersController.addProvider);
router.patch('/:id', ProvidersController.updateProvider);
router.delete('/:id', ProvidersController.deleteProvider);

module.exports = router;
