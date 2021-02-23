const express = require('express')
const bodyParser = require('body-parser');
const mongoose=require('mongoose');
const dotenv = require('dotenv')
const path = require('path')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
var nodemailer = require('nodemailer');

const port = process.env.PORT||3000;
dotenv.config({ path: './config/config.env' })
 mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser:true,
    useUnifiedTopology: true
})

const app=express()
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
// app.use(express.static('public'))
app.set('view engine','ejs')


// Passport config
require('./config/passport')(passport)

// Middleware
app.use(express.urlencoded({extended:true}))

app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    // cookie: { secure: true ,  maxAge: 6000000 },
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
)

  // Passport middleware
  app.use(passport.initialize())
  app.use(passport.session())


//   routes    
app.use(require("./routes/forms"))
app.use('/auth', require('./routes/auth'))

app.listen(port,()=> console.log("started"))
