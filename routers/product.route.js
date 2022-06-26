const express = require('express')
const router = express.Router()
 
const { validateCreateProduct } = require('../validation/product.validation')
const { getListProduct } = require('../controllers/product.controller')
const { createProduct } = require('../controllers/product.controller')
const { verify } = require('../middleware/auth')
 
router.get('/get', getListProduct)
router.post('/create', validateCreateProduct, verify, createProduct)
 
module.exports = router;