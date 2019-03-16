require('./modules/mongodb');
require('dotenv').config();

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const methodOverride = require('method-override');
const session = require('express-session');
const csrf = require('csurf');
const bodyParser = require('body-parser');
const MongoStore = require('connect-mongo')(session);


const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());


// connect to mongodb
mongoose.connect(process.env.DB_URL, function (err){
    if(err){
        console.error('MESSAGE: mongoDB: connection error', err);
    }else{
        console.log('MESSAGE: mongoDB: connection success');
    }
});


// add these contents should be upper than app.use('/', indexRouter), app.use('/users', usersRouter).
app.use(methodOverride(function(req){
    if( req.body && typeof req.body === 'object' && '_method' in req.body ){
        const method = req.body._method;
        delete req.body._method;
        return method;
    }
}));

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({
        mongooseConnection: mongoose.connection
    }),
    cookie: {
        httpOnly: false,
        secure: true,
        maxage: 1000 * 60 * 30 // 30 minutes
    }
}));
app.use(csrf({cookie: true}));
app.use(flash());
////////////////////////////////////


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/', express.static(path.join(__dirname, 'todo'))); // for heroku
app.listen(process.env.PORT || 8000); // for heroku


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
