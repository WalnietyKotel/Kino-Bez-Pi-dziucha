const express = require('express')
const filmyRouter = require('./filmy')
const ejs = require('ejs')
const path = require("path");
const filmySchema = require("../models/filmy");
const connect = require("../dbs/filmy");
const {find} = require('mongoose')
const indexRouter = express.Router()
const filmRouter = require('./film')
const session = require('express-session')
indexRouter.use('/film',filmRouter)
indexRouter.use('/filmy',filmyRouter)

indexRouter.route('/')
    .get((req,res)=>{

        filmySchema.find({}).exec().then((doc)=>{
    res.render('../index.ejs',{filmy:doc,session:req.session.name})})
})



module.exports = indexRouter