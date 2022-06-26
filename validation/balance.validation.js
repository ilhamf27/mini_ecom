const Joi = require('joi')
const validate = require('../middleware/validate.request')

const topUpValidationSchema = Joi.object({
    userId : Joi.number()
        .integer()
        .required(),

    amount: Joi.number()
        .integer()
        .min(1000)
        .max(2000000)
        .required(),

})

function validateTopUp(req, res, next){
    validate(req, res, next, topUpValidationSchema)
}

module.exports = {
    validateTopUp
}