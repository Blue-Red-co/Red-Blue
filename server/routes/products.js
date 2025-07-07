const { use } = require('node_helper')
const expres = require('express');
const productControllers = require('../controllers/products.controllers')
const router = expres.Router();
router.get('/getproduct', use(productControllers.getProduct_controller));
router.get('/getproducts', use(productControllers.getProducts_controller))

module.exports ={

    router
} 


    