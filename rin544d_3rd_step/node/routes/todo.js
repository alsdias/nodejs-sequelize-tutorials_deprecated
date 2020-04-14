/* coding: UTF-8
last update: 03/11/20 13:23:08
target: todo.js: todo's routing.
s.dias.andre.luiz@gmail.com # 03/11/20 13:23:08
*/


const express = require('express');
const router = express.Router();
const TodoDTO = require('../models/dto/TodoDTO');
const TodoitemDTO = require('../models/dto/TodoitemDTO');
const TodoHelper = require('../models/TodoHelper');
const DbSvc = require('../models/business/DbSvc');
const TodoSvc = require('../models/business/TodoSvc');
const TodoitemSvc = require('../models/business/TodoitemSvc');
const Tools = require('../utils/Tools');
const path = require('path');
const fs = require('fs');

var todoSvc = new TodoSvc();


router.post('/simulate', function(req, res, next) {
  let todoHelper = new TodoHelper();
  let weeks = Tools.toNumber(req.body.weeks);
  let month = 'april';
  let counter = 0;
  let success = true;
  for(let i = 0; i < weeks; i++) {
    let count = todoSvc.populate(month, '' + (i + 1));
    counter += count;
  }  
  let ans = '';
  if(success) {
    ans += '<h5>[SUCCESS]:</h5>Persisted ' + counter + ' todos.</br></br>' + Tools.timestamp() + '</br>';
  } else {
    ans += '<h3>[FAIL]:</h3>Persisted ' + counter + ' todos, but expeted ' + (weeks * 7) + '.</br></br>' + Tools.timestamp() + '</br>';
  }
  res.send(ans);
});

router.get('/', function(req, res, next) {
  todoSvc.listall(res);
});

router.get('/listall', function(req, res, next) {
  let svc = new TodoSvc();
  svc.listall(res);
});

router.get('/tools', function(req, res, next) {
  res.render('todos_tools', { title: 'todos_tools'});
});

router.post('/truncateDelete', function(req, res, next) {
  todoSvc.truncateDelete();
  res.status(200).send("done: todos' data  cleaned — " + Tools.timestamp());
});


module.exports = router;
