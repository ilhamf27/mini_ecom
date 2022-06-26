const express = require('express')
const router = express.Router()
 
const { validateTopUp } = require('../validation/balance.validation')
const { addBalance } = require('../controllers/balance.controller')
const { verify } = require('../middleware/auth')
 
router.post('/add', validateTopUp, verify, addBalance)
 
module.exports = router;