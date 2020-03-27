/* project name: rin544b */

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

// PLACEHOLDER FOR SEQUELIZE'S CODE

var Sequelize = require('sequelize')
  , sequelize = new Sequelize('rin544', 'postgres', 'postgres', {
      dialect: "postgres", // or 'sqlite', 'postgres', 'mariadb'
      port:    5432, // or 5432 (for postgres)
    });

//Connects to the database and if successful, returns message, otherwise error's stack trace.
sequelize
  .authenticate()
  .then(function(err) {
    console.log('Connection has been established successfully.');
  }, function (err) { 
    console.log('Unable to connect to the database:', err);
  });


// If you use this option with Capital letter, PostgreSQL will require double quotes like this:
// select * from "public"."Users";
// select * from "Users";
//var User = sequelize.define('User', {
//  username: Sequelize.STRING,
//  password: Sequelize.STRING
//});

// Defining a table name of your own — better than using the default.
// select * from public.user;  
var User = sequelize.define('User', {
  username: Sequelize.STRING,
  password: Sequelize.STRING
}, {
  tableName: 'user', // this will define the table's name
  //timestamps: false           // this will deactivate the timestamp columns
})

// executes the mappgin defined above creting the table
sequelize.sync({ force: true }) // drops and recreates
  //.sync({ force: false }) // keeps tables' contents.
  .then(function(err) {
    console.log('It worked!');
  }, function (err) { 
    console.log('An error occurred while creating the table:', err);
  });

// Uncomment this line for the 1st time you execute the app.
// It populates the table. Comment after population to avoid repeating the operation.
//User.create({
//  username: 'john-doe',
//  password: 'i-am-so-great'
//}).then(function(user) {
//  console.log('[INFO]: john-doe persisted');
//console.log(User)
//})

// Uncomment to find all - if you let the code that populates uncommented,
// it will be returned several registries.
//User.findAll().then(function (users) {
//        console.log(users);
//    });

// Find by Primary key    
//User.findByPk(1).then(function (users) {
//        console.log(users.id + ", " + users.username);
//    });

// Find by username.    
//User.find({ where: { username: 'john-doe' } })
//  .then(function(err, johnDoe) {
//    if (!johnDoe) {
//      console.log('No user with the username "john-doe" has been found.');
//    } else {
//      console.log('Hello ' + johnDoe.username + '!');
//      console.log('All attributes of john:', johnDoe.get());
//    }
//  });


// END OF PLACEHOLDER FOR SEQUELIZE'S CODE

module.exports = app;
