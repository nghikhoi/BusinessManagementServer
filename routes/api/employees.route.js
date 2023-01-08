const router = require('express').Router();
const {EmployeesController} = require('../../controllers/employees.controller');

router.get('/:id', EmployeesController.getEmployee);
router.get('/', EmployeesController.getEmployees);
router.post('/', EmployeesController.addEmployee);
router.patch('/:id', EmployeesController.updateEmployee);
router.delete('/:id', EmployeesController.deleteEmployee);
router.get('/:id/contracts', EmployeesController.getContractsOfEmployee);
router.post('/:id/contracts', EmployeesController.addFutureContract);
router.delete('/:id/current_contract', EmployeesController.terminateCurrentContract);
router.delete('/:id/contracts', EmployeesController.deleteFutureContract);

module.exports = router;
