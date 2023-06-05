const express = require('express')
const filmRouter = express.Router()
const ejs = require('ejs')
const filmySchema = require("../models/filmy");
const session = require('express-session')
const body = require('body-parser')
const {Seanse, Cinema} = require("../private_modules/db");

filmRouter.use(body.json())

filmRouter.route('/:_id')
.get((req,res)=>{
    filmySchema.findOne({_id:req.params._id.substring(1)}).exec().then((doc)=>{
        const qu = Seanse.find({ movie: req.params._id.substring(1) })
        qu.then((doc_qu)=>{

            //query - all cinemas with the movie
            const que = Cinema.find({ movies: { $in: req.params._id.substring(1) } }).exec();
            que.then((doc_que)=>{

                let arrSea = [];

                doc_qu.forEach(element => {
                    doc_que.forEach(elementCin => {
                        if(element.cinema.toString() == elementCin._id.toString()){
                            arrSea.push([element,elementCin.address,elementCin.city,doc.price]);
                            return;
                        }
                    })
                });

                res.render('film.ejs', {filmy: doc, sea: arrSea, session: req.session.name});
            })
        })
    })


})

module.exports = filmRouter