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
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
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


// CLOUD DATABASE
var Sequelize = require('sequelize'),
 sequelize = new Sequelize({
  username: "mutclyib",
  password: "89RRrgOpCmuNkZxBMPxWC-5Koz2hvYCJ",
  database: "mutclyib",
  host: "tuffi.db.elephantsql.com",
  port: 5432,
  dialect: "postgres"
 });


// LOCAL DATABASE 
// var Sequelize = require('sequelize'),
//   sequelize = new Sequelize({
//     username: "postgres",
//     password: "postgres",
//     database: "rin544_dev",
//     host: "localhost",
//     port: 5432,
//     dialect: "postgres"
//   });

// test the connection
sequelize
  .authenticate()
  .then(function (err) {
    console.log('Connection has been established successfully.');
  }, function (err) {
    console.log('Unable to connect to the database:', err);
  });


// Define a model to be used by the ORM.
var User = sequelize.define('User', {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  username: Sequelize.STRING,
  password: Sequelize.STRING
}, {
  tableName: 'user', // this will define the table's name
  //timestamps: false           // this will deactivate the timestamp columns
})


// PAY ATTENTION TO THIS VARIABLE: if true, sequelize recreates the tables.
var recreateDb = false;

sequelize.sync({
    force: recreateDb
  }) // if true, drops and recreates.
  .then(function (err) {
    console.log('It worked!');
  }, function (err) {
    console.log('table creation failed due to:', err);
  });

// User.create({
//   username: 'John Doe',
//   password: 'secret'
// }).then(function (user) {
//   console.log('[INFO]: John Doe persisted');
//   //console.log(User)
// })

// User.create({
//   username: 'Mary Doe',
//   password: 'secret2'
// }).then(function (user) {
//   console.log('[INFO]: Mary Doe persisted');
//   //console.log(User)
// })

// User.findByPk(1).then(function (user) {
//   console.log('------------------------------------------');
//   console.log('>findByPk(1):');
//   console.log('\n[INFO]: ' + user.id + ", " + user.username + '\n');
// });


// find by username
// const users = User.findAll({
//   where: {
//     username: 'John Doe'
//   }
// }).then(function (data, err) {
//   if(!data) {
//     console.log('------------------------------------------');
//     console.log('[FAIL]: user instance not found due to: ' + err);  
//     console.log('------------------------------------------');
//   } else {
//     console.log('------------------------------------------');
//     console.log('[SUCCESS]: instance found: ');  
//     for (u of data) {
//       console.log(u.dataValues);
//       console.log('\n>FULL CONTENT ------------------------------------------');
//       console.log(u);  
//     }
//   }
// })


// // find all
// const list = User.findAll().then(function (data, err) {
//   if(!data) {
//     console.log('------------------------------------------');
//     console.log('[FAIL]: user instance not found due to: ' + err);  
//     console.log('------------------------------------------');
//   } else {
//     console.log('------------------------------------------');
//     console.log('[SUCCESS]: instance found: ');  
//     for (u of data) {
//       console.log(u.dataValues);
//       console.log('\n>FULL CONTENT ------------------------------------------');
//       console.log(u);  
//     }
//   }
// })

module.exports = app;