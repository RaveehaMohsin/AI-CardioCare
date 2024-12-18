var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const database = require('./database/mysql')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');



//auth routers
var addauthuser = require('./routes/Authentication/adduser')
var getauthuser = require('./routes/Authentication/getuser')
var getreview = require('./routes/Reviews/getreviews')

//admin routers
var getpatients = require('./routes/Admin/getpatients')
var gethealthdetails = require('./routes/Admin/gethealthdetails')

//contact
var contactus = require('./routes/nodemail')

//person routers
var addperson = require('./routes/addperson')
var getperson = require('./routes/getperson')
var getuser = require('./routes/getuser')
var healthpredict = require('./routes/heartpredict')
var gethealth = require('./routes/gethealth')
var addhealthreport = require('./routes/healthreportadd')
var gethealthreport = require('./routes/healthreportget')
var addreview = require('./routes/Reviews/addreview')

var app = express();

const cors = require("cors");


// Allow requests from specific origins
app.use(cors({
    origin: "http://localhost:3000", 
    methods: ["GET", "POST", "PUT", "DELETE"], 
    credentials: true 
}));

app.use(express.json());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/public", express.static(path.join(__dirname, "public")));
app.use('/personImages', express.static(path.join(__dirname, 'personImages')));
app.use('/personImages', express.static(path.join(__dirname, 'public', 'personImages')));


app.use('/', indexRouter);
app.use('/users', usersRouter);


//route for contact
app.use('/contactus' , contactus);

//routes for authentication
app.use('/addauthuser' , addauthuser);
app.use('/getauthuser' , getauthuser);

//routes for admin
app.use('/getpatients' , getpatients)
app.use('/getreview' , getreview)
app.use('/gethealthdetails' , gethealthdetails)

//routes for person
app.use('/addperson' , addperson);
app.use('/getperson' , getperson);
app.use('/getuser' , getuser);
app.use('/health-details' , healthpredict)
app.use('/gethealth' , gethealth)
app.use('/addreview' , addreview)

app.use('/addhealthreport' , addhealthreport)
app.use('/gethealthreport', gethealthreport)



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
