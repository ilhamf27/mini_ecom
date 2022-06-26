const express = require('express')
const router = express.Router()
 
const { validatePurchase } = require('../validation/history.validation')
const { purchase } = require('../controllers/history.controller')
const { getUserHistory } = require('../controllers/history.controller')
const { verify } = require('../middleware/auth')
 
router.post('/purchase', validatePurchase, verify, purchase)
router.get('/get',verify, getUserHistory)
 
module.exports = router;