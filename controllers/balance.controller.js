const { Balance } = require("../models")
const { User } = require("../models")
const { Role } = require("../models")
 
 const addBalance = async(req, res)=>{
    const id = req.id
    const userId = req.body.userId
    const jml = req.body.amount

    User.findOne({
        where : {
            id:id,
        },
        include: {
            model: Role,
            as: "roles",
            where : {
                role:"ADMIN"
            }
        }
    }).then( user => {
        if( !user ) {
            return res.status(400). send({
                message: "Tidak ada akses tambah balance!"
            })
        }

        Balance.findOne({
            where:{
                userId:userId
            }
        }).then( balance => {
            if( !balance ){
                Balance.create({
                    userId: userId,
                    amount: 0
                }).then(balance => {
                    res.status(200).send({
                        status: "Success",
                        message: "Balance Berhasil Dibuatkan",
                        data : balance
                    })
                })
            }
            Balance.update({
                amount:balance.amount+jml
            },{
                where:{
                    userId:userId
                }
            }).then(balance=>{
                res.status(200).send({
                    status: "Success",
                    message: "Balance Berhasil Ditambah",
                    data : balance
                })
            })

        })
    }).catch(e=> {
        console.log(e)
       
        return res.status(500). send({
            message: "Internal server Error"
        })
    })
 }

 module.exports = {
    addBalance
 }