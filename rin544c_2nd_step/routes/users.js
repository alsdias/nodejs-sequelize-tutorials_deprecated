var express = require('express');
var router = express.Router();
const PgSeqlDB = require('../models/persistence/PgSeqlDB');


router.get('/', function(req, res, next) {
  //res.render('users', { title: 'Express' });
  pg = new PgSeqlDB(false,false);
  return pg.findAll(res);
});


module.exports = router;