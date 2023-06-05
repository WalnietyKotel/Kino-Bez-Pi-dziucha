const express = require('express')
const path = require('path')
const indexRouter = require('./routes/index')
// const staticRouter = require('./routes/static')
const loginRouter = require('./routes/login')
const about_usRouter = require('./routes/about_us')
const registerRouter = require('./routes/register')

const filmy = require('./models/filmy')
const body = require('body-parser')
const {
    dbSetup,
    Cinema,
    add,
    emailValidation,
    passowrdValidation,
    Seanse,
    Reservation
} = require('./private_modules/db.js');

const mail = require('./private_modules/mail')
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
app.use(express.static('./public'));
app.use('/',indexRouter)
// app.use('/public',staticRouter)
app.use('/login', loginRouter)
app.use('/about_us', about_usRouter)
app.use('/register', registerRouter)
app.use('/kup',kupRouter)
app.set('view engine','ejs')

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
app.get(`/reservation/:_id`, (req, res) => {
    res.status(200);
    //query - movie
    const q = filmy.findOne({_id: req.params._id.substring(1)}).exec();
    q.then((doc_q)=>{

        //query - all seanses with the movie
        const qu = Seanse.find({ movie: req.params._id.substring(1) })
        qu.then((doc_qu)=>{

            //query - all cinemas with the movie
            const que = Cinema.find({ movies: { $in: req.params._id.substring(1) } }).exec();
            que.then((doc_que)=>{

                let arrSea = [];

                doc_qu.forEach(element => {
                    doc_que.forEach(elementCin => {
                        if(element.cinema.toString() == elementCin._id.toString()){
                            arrSea.push([element,elementCin.address]);
                            return;
                        }
                    })
                });

                res.render(`./reservation/listing/index.ejs`, {mov: doc_q, sea: arrSea});
            })
        })
    })
})

app.get(`/reservation/seat/:_id`, (req, res) => {
    //in case user is not logged in
    console.log(req.session.name);
    console.log(req.session.email);
    if(req.session.name == undefined || req.session.email == undefined){
        res.redirect(`/login`);
    }
    //query - the specified seanse
    const q = Seanse.findOne({_id:req.params._id.substring(1)}).exec();
    q.then((doc)=>{
        const f = filmy.findOne({_id:doc.movie}).exec();
        f.then((f)=>{
        //query - the cinema hosting the seanse
        const qu = Cinema.findOne({_id: doc.cinema}).exec();
        qu.then((docCin)=>{
console.log(docCin)
            //query - any existing reservations for seanse
            const que = Reservation.find({seanse: req.params._id.substring(1)}).exec();
            que.then((docRes)=>{

                const resSt = new Array; //convenience array
                docRes.forEach(element => {
                    resSt.push(element.seat); //getting every reservation's seat into resSt
                })
console.log(docCin.seats)
                console.log(resSt)
                console.log(doc._id)
                res.render(`reservation/seats/index.ejs`, {session:req.session.name, totalSeats: docCin.seats, takenSeats : resSt, seanse: doc._id, price:f.price});
            })
            })
        })
    })
})

app.post(`/reservation/seat/:_id/final`, (req, res) => {
    //in case user is not logged in - as if, right?
    if(req.session.name == undefined || req.session.email == undefined){
        res.redirect(`/login`);
    }
    //query - find the matching user - note to self: fuck
    const q = User.findOne({username: req.session.name}).exec();
    q.then((doc)=>{

        const qu = Seanse.findById(req.body.seanse).exec();
        qu.then((doc_qu)=>{

            const que = filmy.findOne({_id: doc_qu.movie}).exec();
            que.then((doc_que)=>{

                let bookArr = req.body.seat.split(",")

                bookArr.forEach(element => {
                    let obj = { //convenience object
                        type: 'reservation',
                        user: doc._id,
                        seanse: req.body.seanse,
                        seat: element
                    }
                    //db save
                    add(obj.type,obj);
                })

                bookArr.sort((a, b) => a - b);

                mail.mailOptions.text = `Zakupiono bilet(y) na ${doc_que.title}. Twoje miejsca to: ${bookArr.toString()}`;
                mail.mailOptions.to = req.session.email;
                mail.sendMail();

                console.log(doc_que.title);
                res.render(`./reservation/final/index.ejs`, {session:req.session.name,movie: doc_que.title});
            })
        })
    })
})




/////////////////////////////////////////////////////////////////

app.all('*',(req,res)=>{
    res.render('404.ejs',{session:req.session.name})
})

connectDB().then(()=>{app.listen(5000, () => {console.log("Server listening on port 5000")})})


