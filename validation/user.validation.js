const Joi = require('joi')
const validate = require('../middleware/validate.request')

const registerValidationSchema = Joi.object({
    username : Joi.string()
        .alphanum()
        .min(3)
        .max(15)
        .required(),

    email: Joi.string()
        .email(),

    password: Joi.string()
    .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),

})

const loginValidation = Joi.object({
    email: Joi.string()
        .email(),

    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
})

function validateRegister(req, res, next){
    validate(req, res, next, registerValidationSchema)
}

function validateLogin(req, res, next){
    validate(req, res, next, loginValidation)
}

module.exports = {
    validateRegister,
    validateLogin
}