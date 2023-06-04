const express = require('express')
const filmyRouter = require('./filmy')
const ejs = require('ejs')
const path = require("path");
const filmySchema = require("../models/filmy");
const connect = require("../dbs/filmy");
const {find} = require('mongoose')
const kupRouter = express.Router()
const filmRouter = require('./film')
const session = require('express-session')


kupRouter.route('/:title')
    .get((req,res)=>{
        filmySchema.findOne({title:req.params.title.substring(1)}).exec().then((doc)=>{
            res.render('../kup.ejs',{filmy:doc,session:req.session.name})})

    })



module.exports = kupRouter