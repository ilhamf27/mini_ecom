const jwt = require('jsonwebtoken')
const privatekey = "hello123"
 
const verify = (req, res, next) => {
   const token = req.headers["authentication"]
   jwt.verify(token, privatekey, (err, decoded) => {
       if(err){
           return res.status(403).send({
               message: "User is not Authorize"
           })
       }
 
       req.id = decoded.id
       req.email = decoded.email
       next()
   })
}
 
const generateToken = ( payload ) => {
   const token = jwt.sign(payload, privatekey, {
       algorithm: "HS256",
       expiresIn: "1H"
   })
   return token
}
 
module.exports = {
   generateToken,
   verify
}