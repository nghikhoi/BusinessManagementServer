const {ValidateProperty} = require("../middleware/validateproperty");
const {UserSearch, ProfileUpdateRequest} = require("../../schema/user.schema");
const router = require('express').Router();
const CustomerController = require('../../controllers/customer.controller').CustomerController;

//TODO
// router.get('/profile/:user_id?', CustomerController.getProfile);
// router.post('/profile/:user_id?', ValidateProperty(ProfileUpdateRequest), CustomerController.updateProfile);

// router.get('/', ValidateProperty(null, UserSearch), CustomerController.search);

module.exports = router;


