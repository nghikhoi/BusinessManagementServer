const {ValidateProperty} = require("../middleware/validateproperty");
const {UserSearch, ProfileUpdateRequest} = require("../../schema/user.schema");
const router = require('express').Router();
const EmployeeController = require('../../controllers/employee.controller').EmployeeController;

//TODO
// router.get('/profile/:user_id?', EmployeeController.getProfile);
// router.post('/profile/:user_id?', ValidateProperty(ProfileUpdateRequest), EmployeeController.updateProfile);

router.get('/', ValidateProperty(null, UserSearch), EmployeeController.search);

module.exports = router;


