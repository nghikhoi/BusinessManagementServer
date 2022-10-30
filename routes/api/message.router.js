const {MessageController} = require("../../controllers/message.controller");
const router = require("express").Router();

router.get('/feedbacks', MessageController.getFeedbacks);
router.get('/feedback/:book_id', MessageController.getFeedback);

router.post('/feedback/:book_id', MessageController.addFeedback);
router.post('/:feedback', MessageController.addMessage);

module.exports = router;
