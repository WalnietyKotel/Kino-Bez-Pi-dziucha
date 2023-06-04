const express = require('express')
const filmyRouter = express.Router()
const filmySchema = require('../models/filmy')
const body = require('body-parser')
const connect = require('../dbs/filmy')

filmyRouter.use(body.json())
// filmyRouter.route('/studio:Marvel')
// .get(async(req,res)=>{
//     const db = await connect();
//     const filmy = await db.collection('filmy').find({'studio':'Marvel'}).toArray()
//     res.json(filmy)
// })
// filmyRouter.route('/studio:Disney')
//     .get(async(req,res)=>{
//         const db = await connect();
//         const filmy = await db.collection('filmy').find({'studio':'Disney'}).toArray()
//         res.json(filmy)
//     })

filmyRouter.route('/').get(async(req,res)=>{
        const db = await connect()
        const filmy = await db.collection('filmy').find().toArray()
        res.json(filmy)
})

    .post(async (req,res)=>{
        try {
        await filmySchema.create(req.body)
            res.json({'test':'test'})
        }    catch (e){
            res.json(e)
        }

    })
filmyRouter.route('/id:').get(async(req,res)=>{
    const db = await connect()
    const filmy = await db.collection('filmy').find(req.params.id)
    res.json(filmy)
})

module.exports = filmyRouter;