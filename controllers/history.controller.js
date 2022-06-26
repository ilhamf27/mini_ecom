const { Balance } = require("../models")
const { User } = require("../models")
const { Product } = require("../models")
const { History } = require("../models")
const { Op } = require("sequelize")
 
 const purchase = async(req, res)=>{
    const userId = req.id
    const productId = req.body.productId
    const qty = req.body.quantity

    try {    
      const result = await History.sequelize.transaction(async (t) => {
         User.findOne({
            where:{
               id:userId
            }
         }).then( user => {
            if( !user ) {
               return res.status(400). send({
                   message: "User tidak terdaftar!"
               })
           }
           Product.findOne({
               where:{
                  id:productId,
                  quantity:{
                     [Op.gte]:qty
                  }
               }
           }).then( product =>{
               if( !product ) {
                  return res.status(400). send({
                     message: "Quantity atau Product tidak terdaftar!"
                  })
               }
               
               Balance.findOne({
                  where:{
                     userId:userId,
                     amount:{
                        [Op.gte]:product.price*qty
                     }
                  }
               }).then( balance =>{
                  if( !balance ) {
                     return res.status(400). send({
                        message: "Saldo Anda Kurang!"
                     })
                  }
                  Product.update({
                     quantity:product.quantity-qty
                  },{
                     where:{
                        id:productId
                     }
                  },{
                     transaction:t
                  })
                  Balance.update({
                     amount:balance.amount-(product.price*qty)
                  },{
                     where:{
                        userId:userId
                     }
                  },{
                     transaction:t
                  })
                  History.create({
                     userId:userId,
                     productId:productId,
                     quantity:qty,
                     totalPrice: product.price*qty
                  }).then( history =>{
                     res.status(200).send({
                        status: "Success",
                        message: "Transaksi Berhasil Dibuat!",
                        data : history
                    })
                  },{
                     transaction:t
                  })
                  
               })
           })
         });
      })
     } catch (error) { 
        console.log(error)   
     }
 }

 const getUserHistory = async (req, res) => {
   const id = req.id
   return User.findAll({
       where:{
         id:id
       },
      include: {
         model:History,
         as:"histories",
         include: {
            model: Product,
            as:"products"
         }
      }
   }).then(history => {
       res.status(200).send({
           status: "success",
           data : history
       })
   })
 }

 module.exports = {
    purchase,
    getUserHistory
 }