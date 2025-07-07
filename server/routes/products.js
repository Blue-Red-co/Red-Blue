const { use } = require('node_helper')
const expres = require('express');
const productControllers = require('../controllers/products.controllers')
const router = expres.Router();
router.get('/getproduct', use(productControllers.getproduct_controller));


module.exports ={

    router
} 


    