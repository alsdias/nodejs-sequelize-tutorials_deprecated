var express = require('express');
var router = express.Router();
var TodoDTO = require('../models/dto/TodoDTO');
var TodoitemDTO = require('../models/dto/TodoitemDTO');
var TodoHelper = require('../models/TodoHelper');

/* GET users listing. */
router.get('/', function(req, res, next) {
  let todoHelper = new TodoHelper();

  //  - RANDOMIC ITEM'S SIZE:
  //let todos =  todoHelper.populate();
  //  - FIXED ITEM'S SIZE:
  todos =  todoHelper.populate(2);
//  todos.forEach(x => {console.log(x.print())});

  res.render('todos', { title: 'TODOS', todos: todos });
});

module.exports = router;
