const {ValidateProperty} = require("../middleware/validateproperty");
const {UserSearch, ProfileUpdateRequest} = require("../../schema/user.schema");
const router = require('express').Router();
const CustomerController = require('../../controllers/customer.controller').CustomerController;

router.get('/profile/:user_id?', CustomerController.getCustomer);
router.post('/profile/:user_id?', ValidateProperty(ProfileUpdateRequest), CustomerController.save);

router.get('/', ValidateProperty(null, UserSearch), CustomerController.getAll);

module.exports = router;


