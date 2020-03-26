/* coding: UTF-8
last update: 03/11/20 13:23:08
target: todo.js: <description here>
s.dias.andre.luiz@gmail.com # 03/11/20 13:23:08
L:\work\devcli_\javascript\jstopics\express\app_express_generator_ejs\docs\rin544c\node\routes\todo.js

- TOOLS:
.ttjscom;
.jstools
*/

var express = require('express');
var router = express.Router();
var TodoDAO = require('../models/persistence/dao/TodoDAO');
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
