var express = require('express');
var router = express.Router();
const bodyParser = require("body-parser");

const TodoSvc = require('../models/business/TodoSvc');
var todoSvc = new TodoSvc();

/* GET home page. */
router.get('/', function(req, res, next) {
  todoSvc.listall(res);
});


module.exports = router;

module.exports = router;
