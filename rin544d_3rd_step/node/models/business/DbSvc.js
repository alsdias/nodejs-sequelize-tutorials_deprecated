/* coding: UTF-8
last update: 03/11/20 13:17:15
s.dias.andre.luiz@gmail.com # 03/11/20 13:17:15
*/
'use strict';
const PgSeqlDB = require('../persistence/dao/PgSeqlDB');
const ConfigSvc = require('../../utils/ConfigSvc');
const Tools = require('../../utils/Tools');

/**
 * target: offers database support services like tables' creation, population, etc.
 *
 * @class DbSvc
 */
class DbSvc {

  constructor() {
    this.pgSeqlDB = new PgSeqlDB();
		this.sequelize = this.pgSeqlDB.sequelize;
  }

  test(res) {
		res.status(200).render('dbSvc');
	}

}

module.exports =  DbSvc;
