const mongoose = require(`mongoose`);
const bodyParser = require('body-parser');
const {hash} = require('./crypto.js');

    //SCHEMA DECLARATION
const movieSchema = new mongoose.Schema({
    name: {type: String, required: true},
    release_date: {type: String, required: true},
    icon: {type: String, required: true, default: 'https://m.media-amazon.com/images/I/51y7GEUlWfL._AC_UF1000,1000_QL80_.jpg'},
    background: {type: String, default: "https://i.imgur.com/UorGjvc.png"}, //1984 office
    description: {type: String, required: true, defualt: 'Paceholder movie description: '},
    trailer: {type: String, default: "https://www.youtube.com/watch?v=8dxh3lwdOFw"}, //Citizen Kane
    director: {type: String, default: "Orson Welles"},
    music: {type: String, default: "Kanye West"},
    genre: {type: String, default: "Action"}
});

const userSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    email: {type: String, required: true},
    password: {type: String, required: true}
});

const seanseSchema = new mongoose.Schema({
    cinema: {type: mongoose.ObjectId, required: true},
    movie: {type: mongoose.ObjectId, required: true},
    date: {type: String, required: true},
    time: {type: Number, required: true},

        //because '3d' is not a valid attribute name
    d3: {type: Boolean, default: false, required: true}, 
    language: {type: String, enum:['lektor','dubbing','napisy'], default:'napisy'}
})

const cinemaSchema = new mongoose.Schema({
    city: {type: String, required: true},
    address: {type: String},
    movies: {type: [mongoose.ObjectId]},
    seats: {type: Number, required: true, default: 20}
})

const reservationSchema = new mongoose.Schema({
    seanse: {type: mongoose.ObjectId, required: true},
    user: {type: mongoose.ObjectId, required: true},
    seat: {type: Number, required: true}
})


    //MODEL COMPLIATION
const Movie = mongoose.model('Movie', movieSchema);
const User = mongoose.model('User', userSchema);
const Seanse = mongoose.model('Seanse', seanseSchema);
const Cinema = mongoose.model('Cinema', cinemaSchema);
const Reservation = mongoose.model('Reservation', reservationSchema);

    //INCREDIBLY NECESSARY OUTSIDE FUNCTION
const dbSetup = async () => {
    await mongoose.connect('mongodb://127.0.0.1:27017/cin');
}

    //ADD MOVIE
const addMov = obj => {
    new Movie({
        name: obj.name, 
        release_date: obj.release_date,
        icon: obj.icon,
        background: obj.background,
        description: obj.description,
        trailer: obj.trailer,
        director: obj.director,
        music: obj.music,
        genre: obj.genre }
        ).save();
}
    //ADD USER  
const addUser = obj => {
    const password = hash(obj.password);
    new User({
        username: obj.username, 
        email: obj.email,
        password: password }
        ).save();
}

    //ADD SEANSE
const addSea = obj => {
    new Seanse({
        cinema: obj.cinema,
        date: obj.date,
        time: obj.time,
        movie: obj.movie,
        d3: obj.d3,
        language: obj.language, 
    }).save();
}

    //ADD CINEMA
const addCin = obj => {
    new Cinema({
        city: obj.city,
        address: obj.address,
        movies: obj.movies
    }).save();
}

const addRes = obj => {
    new Reservation({
        user: obj.user,
        seanse: obj.seanse,
        seat: obj.seat
    }).save();
}

    //ADD CONTROLLER
const add = async (type, obj) => {
    switch(type){
        case 'movie': 
            addMov(obj);
            break;
        case 'user': 
            addUser(obj);
            break;
        case 'seanse':
            addSea(obj);
            break;
        case 'cinema':
            addCin(obj);
            break;
        case 'reservation':
            addRes(obj);
            break;
    }
}

    //REGEX VALIDATION PATTERNS
const emailValidation = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    //translated - any combination of alphanumeric or dots, then @, then any number of [`anything.`] followed by one [`min2max4`]
    //example valid emails
        //cain.goodman@email.gov.uk
        //walterwhite23@yahoomail.scss
        //mccarran.ncr.mojave@bethesda.us.tx.au
    //example invalid emails
        //jw@nc.c - top level domain shorter than 2 characters
        //genesis@wp.europe - top level domain longer than 4 characters
        //maximusdinus@gmail - no top level domain at all
            //the same goes for maximusdinus@gmail.

const passowrdValidation = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*\_])(?=.{8,})/g
    //translated - minimum 8 characters long, contains 1+ uppercase, 1+ lowercase, 1+ number, 1+ `special character` those being !@$%^&*_
        //example valid passwords
            //Slonko_123!
            //Sam_I_Am9
            //Weezerini_13
        //example invalid passwords
            //_Node1 - too short
            //G_G@ZSTI - no lowercase
            //AStasiak1981 - no special character

    //EXP
module.exports = {
    User,
    Cinema,
    Seanse,
    Movie,
    Reservation,
    dbSetup,
    add,
    emailValidation,
    passowrdValidation
}