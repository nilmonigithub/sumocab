require('./model/db');
const express = require('express');
const path = require('path');
var favicon 			= require('static-favicon');
var multer=require('multer');
var ejs = require('ejs')
var partials 			= require('express-partial');
const bodyparser = require('body-parser');
var cookieParser = require('cookie-parser');
const hbsheader = require('hbs-header');
var bcrypt = require('bcrypt');
var SALT_WORK_FACTOR = 12;
var session = require('express-session');
// var connectMongo = require('connect-mongo');
// const MongoStore = connectMongo(session);
var MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');
var app = express();





const dashboardController = require('./controller/dashboardController');
const userController = require('./controller/userController');
const driverController = require('./controller/driverController');
const vehicleController = require('./controller/vehicleController');
const tripController = require('./controller/tripController');
const customerController = require('./controller/customerController');
const ownerController = require('./controller/ownerController');
const vehicle_documentController = require('./controller/vehicle_documentController');
const coupon_discountController = require('./controller/coupon_discountController');
const paymentController = require('./controller/paymentController');
var index = require('./controller/index');




var app = express();

app.use(bodyparser.json());

var storage = multer.diskStorage({
  destination: 'public/uploads/',
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now()+ '.jpg')
  }
})


app.listen(3000,()=>{
  console.log('Express server started at port :3000');
  });

app.locals.baseurl='http://localhost:3000';

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));


app.set('views', path.join(__dirname,'/views/'));
// app.engine('ejs',express({extname:'ejs',
// partialsDir  : [
//     //  path to  partial
//     path.join(__dirname, 'views/partials'),
// ]
// }));
app.set('view engine', 'ejs');
app.use(bodyparser.urlencoded({extended : true}));
app.use(cookieParser());




app.use(express.static(path.join(__dirname , "/" , "public")));






// catch 404 and forward to error handler
// app.use(function (req, res, next) {
//     var err = new Error('File Not Found');
//     err.status = 404;
//     next(err);
//   });
  
  // error handler
  // define as the last app.use callback
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.send(err.message);
  });
 


  // mongoose.connect('mongodb://localhost/sumocabapp', { useMongoClient: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
});

app.use(session({
    secret: 'botnyuserdetails',
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 365 * 24 * 60 * 60 * 1000 },
    store: new MongoStore({
      mongooseConnection: db,
      // touchAfter: 24 * 3600, // time period in seconds
      host: '127.0.0.1', 
      port: '27017', 
      collections: 'sessions', 
      url: 'mongodb://localhost:27017/sumocabapp'
      //db:'nodesession',
    })
  }));

  app.use((req, res, next) => {
    if (req.cookies.user_sid && !req.session.user) {
        res.clearCookie('user_sid');        
    }
    next();
});




app.use('/', index);
app.use('/dashboard', dashboardController);
app.use('/user',userController);
app.use('/driver',driverController);
app.use('/vehicle',vehicleController);
app.use('/trip',tripController);
app.use('/customer',customerController);
app.use('/owner',ownerController);
app.use('/vehicle_document',vehicle_documentController);
app.use('/coupon_discount',coupon_discountController);
app.use('/payment',paymentController);