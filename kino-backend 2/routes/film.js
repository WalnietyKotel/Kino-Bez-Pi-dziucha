const express = require('express')
const filmRouter = express.Router()
const ejs = require('ejs')
const filmySchema = require("../models/filmy");
const session = require('express-session')
const body = require('body-parser')

filmRouter.use(body.json())

filmRouter.route('/:title')
.get((req,res)=>{
    filmySchema.findOne({title:req.params.title.substring(1)}).exec().then((doc)=>{
        res.render('../film.ejs',{filmy:doc,session:req.session.name})})

})

module.exports = filmRouter