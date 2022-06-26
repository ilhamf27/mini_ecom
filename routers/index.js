const express = require('express')
const router = express.Router()
 
const user = require('./user.route')
const product = require('./product.route')
const balance = require('./balance.route')
const history = require('./history.route')
 
router.use('/user', user)
router.use('/product', product)
router.use('/balance', balance)
router.use('/history', history)
 
module.exports = router;