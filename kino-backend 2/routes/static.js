const express = require('express')
const path = require("path");
const staticRouter = express.Router()

staticRouter.get(('/main.css'),(req,res)=>{
    res.sendFile(path.join(__dirname,('../public/main.css')))
})

staticRouter.get(('/about_us.css'),(req,res)=>{
    res.sendFile(path.join(__dirname,('../public/about_us.css')))
})

staticRouter.get(('/kup.css'),(req,res)=>{
    res.sendFile(path.join(__dirname,('../public/kup.css')))
})

staticRouter.get(('/czcionka.css'),(req,res)=>{
    res.sendFile(path.join(__dirname,('../public/czcionka.css')))
})

staticRouter.get(('/film.css'),(req,res)=>{
    res.sendFile(path.join(__dirname,('../public/film.css')))
})

staticRouter.get(('/flickity.css'),(req,res)=>{
    res.sendFile(path.join(__dirname,('../public/flickity.css')))
})

staticRouter.get(('/flickity.js'),(req,res)=>{
    res.sendFile(path.join(__dirname,('../public/flickity.js')))
})

staticRouter.get(('/indexF.js'),(req,res)=>{
    res.sendFile(path.join(__dirname,('../public/indexF.js')))
})

staticRouter.get(('/kitek%20pokerface.png'),(req,res)=>{
    res.sendFile(path.join(__dirname,('../public/kitek pokerface.png')))
})

staticRouter.get(('/logowanie.css'),(req,res)=>{
    res.sendFile(path.join(__dirname,('../public/logowanie.css')))
})

staticRouter.get(('/Righteous-Regular.ttf'),(req,res)=>{
    res.sendFile(path.join(__dirname,('../public/Righteous-Regular.ttf')))
})

staticRouter.get(('/main.css/gradient.jpg'),(req,res)=>{
    res.sendFile(path.join(__dirname,('../public/gradient.jpg')))
})

staticRouter.get(('/login.css/gradient.jpg'),(req,res)=>{
    res.sendFile(path.join(__dirname,('../public/gradient.jpg')))
})

staticRouter.get(('/login.css'),(req,res)=>{
    res.sendFile(path.join(__dirname,('../public/login.css')))
})

staticRouter.get(('/login.js'),(req,res)=>{
    res.sendFile(path.join(__dirname,('../public/login.js')))
})

staticRouter.get(('/logowanie.css/gradient.jpg'),(req,res)=>{
    res.sendFile(path.join(__dirname,('../public/gradient.jpg')))
})

staticRouter.get(('/about_us.css/gradient.jpg'),(req,res)=>{
    res.sendFile(path.join(__dirname,('../public/gradient.jpg')))
})

staticRouter.get(('/gradient.jpg'),(req,res)=>{
    res.sendFile(path.join(__dirname,('../public/gradient.jpg')))
})

staticRouter.get(('/zdjecia/im1.jpg'),(req,res)=>{
    res.sendFile(path.join(__dirname,('../public/zdjecia/im1.jpg')))
})

staticRouter.get(('/zdjecia/im2.jpg'),(req,res)=>{
    res.sendFile(path.join(__dirname,('../public/zdjecia/im2.jpg')))
})

staticRouter.get(('/zdjecia/im3.jpg'),(req,res)=>{
    res.sendFile(path.join(__dirname,('../public/zdjecia/im3.jpg')))
})

staticRouter.get(('/zdjecia/sw1.jpg'),(req,res)=>{
    res.sendFile(path.join(__dirname,('../public/zdjecia/sw1.jpg')))
})

staticRouter.get(('/zdjecia/sw2.jpg'),(req,res)=>{
    res.sendFile(path.join(__dirname,('../public/zdjecia/sw2.jpg')))
})

staticRouter.get(('/zdjecia/sw3.jpg'),(req,res)=>{
    res.sendFile(path.join(__dirname,('../public/zdjecia/sw3.jpg')))
})

staticRouter.get(('/zdjecia/sw4.jpg'),(req,res)=>{
    res.sendFile(path.join(__dirname,('../public/zdjecia/sw4.jpg')))
})

staticRouter.get(('/zdjecia/sw5.jpg'),(req,res)=>{
    res.sendFile(path.join(__dirname,('../public/zdjecia/sw5.jpg')))
})

module.exports = staticRouter;