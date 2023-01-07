const router = require('express').Router();
const {ContractTypesController} = require('../../controllers/contracttypes.controller');

router.get('/', ContractTypesController.getContractTypes);
router.get('/:id', ContractTypesController.getContractType);
router.post('/', ContractTypesController.addContractType);
router.patch('/:id', ContractTypesController.updateContractType);
router.delete('/:id', ContractTypesController.deleteContractType);

module.exports = router;
