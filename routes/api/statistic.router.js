const {StatisticController} = require("../../controllers/statistic.controller");
const router = require('express').Router();

router.get('/user/new', StatisticController.getNewUser);
router.get('/user/top', StatisticController.getTopCustomers);

router.get('/order/new', StatisticController.getNewBill);
router.get('/order/top'); //TODO

router.get('/book/new', StatisticController.getNewBook);
router.get('/book/top', StatisticController.getTopBook);
router.get('/book/sold', StatisticController.getBookSold);
router.get('/book/:book_id/sold', StatisticController.getBookSold);
router.get('/book/:book_id/rate', StatisticController.getBookRate);

router.get('/outcome/book/:book_id?'); //TODO
router.get('/outcome/user/:user_id'); //TODO
router.get('/outcome'); //TODO

router.get('/income/book/:book_id?'); //TODO
router.get('/income/user/:user_id'); //TODO
router.get('/income'); //TODO

module.exports = router;
