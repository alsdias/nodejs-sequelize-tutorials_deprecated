var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

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

var pg = require('pg');
//or native libpq bindings
//var pg = require('pg').native


var Sequelize = require('sequelize')
  , sequelize = new Sequelize({
    username: "mutclyib",
    password: "89RRrgOpCmuNkZxBMPxWC-5Koz2hvYCJ",
    database: "mutclyib",
    host: "tuffi.db.elephantsql.com",
  port: 5432,
    dialect: "postgres"
});

sequelize
  .authenticate()
  .then(function(err) {
    console.log('Connection has been established successfully.');
  }, function (err) { 
    console.log('Unable to connect to the database:', err);
  });


// select * from "public"."Users";
// select * from "Users";
var User = sequelize.define('User', {
 username: Sequelize.STRING,
 password: Sequelize.STRING
});

// Defining table name.
// select * from public.user;  
// var User = sequelize.define('User', {
//   username: Sequelize.STRING,
//   password: Sequelize.STRING
// }, {
//   tableName: 'user', // this will define the table's name
//   //timestamps: false           // this will deactivate the timestamp columns
// })

// IMPORTANT: run application once with true. After run it with false.
var recreateDb = false; 

sequelize
  .sync({ force: recreateDb }) // if true, drops and recreates.
  .then(function(err) {
    console.log('It worked!');
  }, function (err) { 
    console.log('An error occurred while creating the table:', err);
  });
  
if (!recreateDb) {

  User.create({
   username: 'john-doe',
   password: 'i-am-so-great'
  }).then(function(user) {
   console.log('[INFO]: john-doe persisted');
   //console.log(User)
  })

  User.findByPk(1).then(function (users) {
    console.log('------------------------------------------');
    console.log('>findByPk(1):');
    console.log('\n[INFO]: ' + users.id + ", " + users.username + '\n');
  });

  User.findAll().then(function (users) {
    console.log('------------------------------------------');
    console.log('>findAll():');
    users.forEach( x => {console.log('\n[INFO]: ' + x.id + ", " + x.username + '\n');})
  });
    
  //User.find({ where: { username: 'john-doe' } })
  //  .then(function(err, johnDoe) {
  //    if (!johnDoe) {
  //      console.log('No user with the username "john-doe" has been found.');
  //    } else {
  //      console.log('Hello ' + johnDoe.username + '!');
  //      console.log('All attributes of john:', johnDoe.get());
  //    }
  //});
  }
  
module.exports = app;
