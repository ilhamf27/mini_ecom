require('dotenv').config();
const express = require('express')

const app = express()
const port = process.env.PORT || 3000

const router = require('./routers')

app.use(express.json())
app.use('/', router)

app.listen(port, ()=>{
    console.log(`My Gram App Listening on Port ${port}`)
})