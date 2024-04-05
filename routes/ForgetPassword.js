const express = require('express');
const router = express.Router();
const forgetPasswordController = require('../controller/ForgetPassword');


router.post('/forget-password',forgetPasswordController.getForgetPassword);

module.exports = router;