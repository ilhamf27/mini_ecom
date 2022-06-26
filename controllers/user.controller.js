const { User } = require("../models")
const { Balance } = require("../models")
const { generateToken } = require("../middleware/auth")
const bcrypt = require("bcrypt")

const login = async (req, res) => {
    const body = req.body
    const email = body.email
    const password = body.password
  
    User.findOne({
        where: {
            email: email
        }
    }).then(user => {
        if(!user) {
            return res.status(400). send({
                message: "Email Not Found"
            })
        }
  
        const isValidPassword = bcrypt.compareSync(password, user.password);
  
        if(!isValidPassword) {
            return res.status(400). send({
                message: "Password is not match"
            })
        }
  
        const token = generateToken({
            id: user.id,
            username : user.username,
            email: user.email,
        });
       
        return res.status(200).send({
            status: "Succes",
            message : "User Login success",
            data : {
                id: user.id,
                username: user.username,
                email: user.email,
                token: token
            }
        })
    }).catch(e=> {
        console.log(e)
       
        return res.status(500). send({
            message: "Internal server Error"
        })
    })
 }
 

const register = async (req, res) => {
    const body = req.body
    const username = body.username
    const email = body.email
    const password = body.password
  
    // 1. Check in DB , if email is exist or not ?
    // 2. if exists , reject register
    // 3. if not, continue Register
  
    User.findOne({
        where : {
            email:email
        }
    }).then( user => {
        if( user ) {
            return res.status(400). send({
                message: "Email Already Exists"
            })
        }
  
        const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
  
        User.create({
            idRole: 1,
            username: username,
            email: email,
            password: hashPassword
        }).then(user => {
            Balance.create({
                userId: user.id,
                amount: 0
            }).then(balance => {
                res.status(200).send({
                    status: "Success",
                    message: "User berhasil dibuat",
                    data : {
                        id: user.id,
                        username: user.username,
                        email: user.email,
                        password: user.password,
                        balance: balance.amount
                    }
                })
            })
        }).catch(e => {
            res.status(500).send({
                status: "Internal Server Error",
                message : e
            })
        })
    })
 }
 module.exports = {
    login,
    register
 }
 