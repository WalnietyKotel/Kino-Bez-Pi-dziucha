const {default: mongoose, model} = require('mongoose')

async function connectDB(){
    await mongoose.connect('mongodb://localhost:27017/filmy')
    console.log('DB connected')
}

module.exports = connectDB;