const Joi = require('joi')
const validate = require('../middleware/validate.request')

const purchaseValidationSchema = Joi.object({
    productId : Joi.number()
        .integer()
        .required(),

    quantity: Joi.number()
        .integer()
        .min(1)
        .required(),

})

function validatePurchase(req, res, next){
    validate(req, res, next, purchaseValidationSchema)
}

module.exports = {
    validatePurchase
}