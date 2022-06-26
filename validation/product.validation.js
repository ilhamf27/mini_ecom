const Joi = require('joi')
const validate = require('../middleware/validate.request')

const createProductValidationSchema = Joi.object({
    name : Joi.string()
        .min(3)
        .max(30)
        .required(),

    category : Joi.string()
        .min(3)
        .max(15)
        .required(),
    
    price : Joi.number()
        .integer()
        .min(1000)
        .required(),

    quantity: Joi.number()
        .integer()
        .min(1)
        .required(),

})

function validateCreateProduct(req, res, next){
    validate(req, res, next, createProductValidationSchema)
}

module.exports = {
    validateCreateProduct
}