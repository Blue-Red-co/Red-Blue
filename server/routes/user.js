const { use } = require('node_helper')
const express = require('express');
const router = express.Router()
const usersControllers = require('../controllers/users.controller');

router.post('/login',use(usersControllers.loginController));

module.exports = {
    router
}