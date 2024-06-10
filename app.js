var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config();
const Sequelize = require('sequelize');
const session = require('express-session');
const flash = require('express-flash');
const multer = require('multer');


var sequelize = new Sequelize("alumnifti", "root", null, {
  host: 'localhost',
  port: 3307, 
  dialect: 'mysql',
});



var app = express();
// app.use(publicRoutes);




// express session
const TWO_HOURS = 1000 * 60 * 60 * 2

SESS_LIFETIME = TWO_HOURS;

const SequelizeStore = require('connect-session-sequelize')(session.Store);


sequelize.define("Session", {
  sid: {
    type: Sequelize.STRING,
    primaryKey: true,
  },
  userId: Sequelize.STRING,
  expires: Sequelize.DATE,
  data: Sequelize.TEXT,
});

function extendDefaultFields(defaults, session) {
  return {
    data: defaults.data,
    expires: defaults.expires,
    userId: session.userId,
  };
}

var store = new SequelizeStore({
  db: sequelize,
  table: "Session",
  extendDefaultFields: extendDefaultFields,
  expiration: TWO_HOURS,
});

app.use(
  session({
    secret: process.env.SESS_SECRET,
    store: store,
    resave: false, // we support the touch method so per the express-session docs this should be set to false
    proxy: true, // if you do SSL outside of node.
    saveUninitialized: false
  })
);
app.use(flash({
  sessionKeyName: 'express-flash-message',
  // You can optionally set the onAddFlash and onConsumeFlash callbacks here
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/node_modules', express.static('node_modules'));


// var indexRouter = require('./routes/index');
var authRouter = require('./routes/auth.route');
var almRouter = require('./routes/routeAlumni/alumni.route');
var formRouter = require('./routes/routeAlumni/formulir.route');
// var adminRouter = require('./routes/admin.route');
// var dosenRouter = require('./routes/dosen.route');
var adminRouter = require('./routes/routeAdmin/admin.route');
var artikelRouter = require('./routes/routeAdmin/artikel.route');

// app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/', almRouter);
app.use('/admin', adminRouter);
// app.use('/admin', adminRouter);
// app.use('/dosen', dosenRouter);



// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


// route handling for 404
app.use(function(req, res, next) {
  res.status(404);

  // respond with html page
  if (req.accepts('html')) {
    res.render('notfound',{title: 'notfound'});
    return;
  }

  // respond with json
  if (req.accepts('json')) {
    res.json({ error: 'Not found' });
    return;
  }

  // default to plain-text. send()
  res.type('txt').send('Not found');
});


module.exports = app;
