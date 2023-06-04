const express = require('express')
const path = require("path");
const ejs = require('ejs')
const staticRouter = require('./static')
const loginRouter = express.Router()
const User = require('../models/user')
const crypto = require('../public/crypto')
const body = require("body-parser");
const session = require('express-session')

loginRouter.use('/public',staticRouter)
loginRouter.use(body.json())
loginRouter.use(express.urlencoded({
    extended:true
}))
loginRouter.route('/')
    .get((req,res)=>{
        res.render('../login.ejs',{session:req.session.name})
    })


module.exports = loginRouter