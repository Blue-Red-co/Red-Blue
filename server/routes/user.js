const { use } = require('node_helper')
const express = require('express');
const router = express.Router()
const usersControllers = require('../controllers/users.controller');

router.post('/login',use(usersControllers.login_Controller));
router.post('/signup', use(usersControllers.createUser_controller));
router.post('/verifyotp', use(usersControllers.verifyOtp_controller));
router.get('/getpassword', use(usersControllers.forgetPassword_controller));
router.get('/getotp', use(usersControllers.reSendOtp_controller))
module.exports = {
    router
}