const express = require('express')
const path = require('path')
const indexRouter = require('./routes/index')
const staticRouter = require('./routes/static')
const loginRouter = require('./routes/login')
const about_usRouter = require('./routes/about_us')
const registerRouter = require('./routes/register')
const body = require('body-parser')
const mongoose = require('mongoose')
const connect = require('./dbs/filmy')
const connectDB = require('./dbs/filmyDB')
const session = require('express-session')
const User = require("./models/user");
const crypto = require("./public/crypto");
const kupRouter = require('./routes/kup')
const app = express()
let sessionSecret = 'unreg';

app.use(session({
    secret: sessionSecret,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 10 * 60 * 1000 }
}));
app.use(body.json())
app.use(express.urlencoded({
    extended:true
}))
app.use('/',indexRouter)
app.use('/public',staticRouter)
app.use('/login', loginRouter)
app.use('/about_us', about_usRouter)
app.use('/register', registerRouter)
app.use('/kup',kupRouter)

/////////////////////////////////////////////////////////////////

    app.post('/login',(req, res) => {
        console.log(`POSTED`);
        res.status(200);
        //query - users with matching data
        const q = User.find({username: req.body.username, password: crypto.hash(req.body.password) }).exec();
        q.then((doc)=>{

            //in case of bad request - how smart I am
            if(doc.length <= 0){
                res.status(400);
                res.render('router/login.js', {success: false}) //'success' value is not yet actually being put into use
            }
            //request goes through
            else{
                //new secret
                app.set(doc[0].username, sessionSecret);
                req.session.regenerate((err) => {
                    if (err) {
                        console.error(err);
                        return res.sendStatus(500);
                    }
                    //new name + email added to session
                    req.session.name = doc[0].username;
                    req.session.email = doc[0].email;

                    res.redirect(`/..`); //[subject to change]
                });
            }
        })
    })





/////////////////////////////////////////////////////////////////

app.all('*',(req,res)=>{
    res.sendFile(path.join(__dirname,'404.ejs'))
})

connectDB().then(()=>{app.listen(5000, () => {console.log("Server listening on port 5000")})})


