const router = require('express').Router();
const {DepartmentsController} = require('../../controllers/departments.controller');

router.get('/', DepartmentsController.getDepartments);
router.get('/:id', DepartmentsController.getDepartment);
router.post('/', DepartmentsController.addDepartment);
router.patch('/:id', DepartmentsController.updateDepartment);
router.delete('/:id', DepartmentsController.deleteDepartment);

module.exports = router;
