const mongoose = require('mongoose')
const {Schema} = require("mongoose");
const filmySchema = new Schema({
    title:{type:String , required:true},
    desc:{type:String , required:true},
    img:{type:String , required:true},
    imgScene:{type:String , required:true},
    trailer:{type:String , required:true},
    price:{type:Number , required:true},
    rec:{type:Boolean , required:true}
})

module.exports=mongoose.model('filmy', filmySchema, 'filmy')