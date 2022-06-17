var express = require('express');
var router = express.Router();
//const UserDB = require('../models/persistence/UserDB');
const UserSvc = require('../models/business/UserSvc');

router.get('/', function(req, res, next) {
  //res.render('users', { title: 'Express' });
  // pg = new UserDB(false,false);
  // return pg.findAll(res);
  userSvc = new UserSvc();
  return userSvc.findAll(res);
});


module.exports = router;