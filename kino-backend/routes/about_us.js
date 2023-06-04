const express = require('express')
const path = require("path");
const ejs = require('ejs')
const staticRouter = require('./static')
const about_usRouter = express.Router()
const session = require('express-session')
about_usRouter.use('/public',staticRouter)

about_usRouter.get('/',(req,res)=>{
    res.render('../about_us.ejs',{session:req.session.name})
})

module.exports = about_usRouter