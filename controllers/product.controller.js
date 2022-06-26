const { Product } = require("../models")
const { User } = require("../models")
const { Role } = require("../models")

const getListProduct = async (req, res) => {
  
    return Product.findAll({
        
    }).then(product => {
        res.status(200).send({
            status: "success",
            data : product
        })
    })
 }
 
 const createProduct = async(req, res)=>{
    const id = req.id
    const name = req.body.name
    const category = req.body.category
    const price = req.body.price
    const qty = req.body.quantity

    User.findOne({
        where : {
            id:id
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
                message: "Tidak ada akses tambah product!"
            })
        }
        Product.findOne({
            where : {
                name: name
            }
        }).then( product =>{
            if( !product ) {
                Product.create({
                    name: name,
                    category: category,
                    price: price,
                    quantity: qty
                }).then(product => {
                    res.status(200).send({
                        status: "Success",
                        message: "Product Baru Berhasil Ditambah",
                        data : product
                    })
                }).catch(e => {
                    res.status(500).send({
                        status: "Internal Server Error",
                        message : e
                    })
                })
            }
            Product.update({
                quantity:product.quantity+qty
            },{
                where : {
                    name: product.name
                }
            }).then(product=>{
                res.status(200).send({
                    status: "Success",
                    message: "Product Quantity Berhasil Ditambah",
                    data : product
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
    getListProduct,
    createProduct
 }