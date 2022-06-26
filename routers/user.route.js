const express = require('express')
const router = express.Router()

const {validateRegister, validateLogin} = require('../validation/user.validation')
const { register } = require('../controllers/user.controller')
const { login } = require('../controllers/user.controller')
 
router.post('/register', validateRegister, register)
router.post('/login', validateLogin, login)
 
module.exports = router;