function validateRequest(req, res, next, schema){
    const {error, value} = schema.validate(req.body)

    if(error){
        return res.status(400).send({
            message : "User is not Authorize",
            error : error.message
        })
    }else{
        req.body = value;
        next()
    }
}

module.exports = validateRequest