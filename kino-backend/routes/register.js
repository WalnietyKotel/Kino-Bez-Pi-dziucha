const express = require('express')
const path = require("path");
const ejs = require('ejs')
const staticRouter = require('./static')
const loginRouter = express.Router()
const body= require('body-parser')
const User = require('../models/user')
const crypto = require('../public/crypto')
const filmySchema = require("../models/filmy");
const session = require('express-session')

loginRouter.use('/public',staticRouter)
loginRouter.use(body.json())
loginRouter.use(express.urlencoded({
    extended:true
}))

loginRouter.route('/')
    .get((req,res)=>{
        res.render('../register.ejs',{session:req.session.name})
    })
    .post(async (req,res)=>{
        try {

                await User.create({username:req.body.username,password:crypto.hash(req.body.password),email:req.body.email})

                res.redirect('/login')
        }    catch (e){
            res.render('../register.ejs')
        }

    })


module.exports = loginRouter