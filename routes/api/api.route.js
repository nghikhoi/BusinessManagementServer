const express = require('express');
const {verifyToken} = require("../auth/auth.middleware");
const router = express.Router();

router.use(verifyToken);
router.use('/user', require('./user.router'));
router.use('/book', require('./book.router'));
router.use('/bill', require('./bill.router'));
router.use('/author', require('./author.router'));
router.use('/publisher', require('./publisher.router'));
router.use('/transporter', require('./transporter.router'));
router.use('/storage', require('./storage.router'));
router.use('/message', require('./message.router'));
router.use('/statistic', require('./statistic.router'));
router.use('/lend', require('./lend.router'));
router.use('/voucher', require('./voucher.router'));

module.exports = router;
