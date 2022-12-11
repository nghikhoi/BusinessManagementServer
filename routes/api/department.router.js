const { DepartmentController } = require("../../controllers/department.controller");
const { PositionController } = require("../../controllers/position.controller");
const router = require("express").Router();

router.get('/search', DepartmentController.getAll);
router.get('/:department_id(\\d+)', DepartmentController.getOne);

// router.post('/:department_id(\\d+)/head', DepartmentController.updateHeadEmployee);
// router.post('/:department_id(\\d+)/employee', DepartmentController.addEmployee);
// router.post('/:department_id(\\d+)/overtime', DepartmentController.updateOvertime); //TODO
router.patch('/:department_id(\\d+)', DepartmentController.save);
router.post('/', DepartmentController.save);

// router.delete('/:department_id(\\d+)/employee', DepartmentController.removeEmployee); //TODO
router.delete('/:department_id(\\d+)', DepartmentController.delete);

module.exports = router;
