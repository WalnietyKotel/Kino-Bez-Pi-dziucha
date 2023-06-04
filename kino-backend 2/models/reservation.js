const mongoose = require('mongoose')
const {Schema} = require("mongoose");
const reservation = new Schema({
    username:{type:String  },
    email:{type:String  },
    password:{type:String  }
})

module.exports=mongoose.model('reservation', reservation, 'reservation')