/* coding: UTF-8
last update: 03/11/20 13:17:15
s.dias.andre.luiz@gmail.com # 03/11/20 13:17:15
*/
'use strict';

var Dbconfig = require('../../../config/config.json');
const { Sequelize, Model, DataTypes } = require("sequelize");

/**
 * Database service using Sequelize and PostgreSQL.
 * target: 
 * @class PgSeqlDB
 */
class PgSeqlDB {

	static sequelize = PgSeqlDB.singleton();

	static singleton() {
		let dbconfig = Dbconfig.test;
		let hasEnv = true;
		//console.log(this.sequelize);
		if (process.env.APP_ENV == 'dev') {
			dbconfig = Dbconfig.development;
			console.log('[INFO]: database configuration set to development.')
		} else	if (process.env.APP_ENV == 'prod') {
			dbconfig = Dbconfig.production;
			console.log('[INFO]: database configuration set to production.')
		} else	if (process.env.APP_ENV == 'cloud') {
			dbconfig = Dbconfig.cloud;
			console.log('[INFO]: database configuration set to cloud.')
		} else	if (process.env.APP_ENV == 'test') {
			dbconfig = Dbconfig.test;
			console.log('[INFO]: database configuration set to test environment.')
		} else {
			hasEnv = false;
		}
		if (!hasEnv) {
			console.log('WARN: database configuration not defined, assuming default (test)');
		}
		console.log('[INFO]: database=' + Dbconfig.development.database + ", username=" + Dbconfig.development.username + ', dialect=' + Dbconfig.development.dialect + ", port: " + Dbconfig.development.port);

		// OPTION 1
		//	var Sequelize = require('sequelize')
		//	var sequelize = new Sequelize(config['db_dev_url'], dbconfig);

			// OPTION 2
		//	var Sequelize = require('sequelize')
		//	  , sequelize = new Sequelize(dbconfig.database, dbconfig.username, dbconfig.password, {
		//		  dialect: "postgres", // or 'sqlite', 'postgres', 'mariadb'
		//		  port:    dbconfig.port, // or 5432 (for postgres)
		//		});
		//
		//	sequelize
		//	  .authenticate()
		//	  .then(function(err) {
		//	  }, function (err) {
		//	  });

		// OPTION 3
		// @SEE:
		// https://sequelize.org/master/class/lib/sequelize.js~Sequelize.html#instance-member-models
		// https://sequelize.org/master/class/lib/transaction.js~Transaction.html
		let sequelize = new Sequelize(dbconfig.database, dbconfig.username, dbconfig.password, {
				dialect: "postgres", // or 'sqlite', 'postgres', 'mariadb'
				port:    dbconfig.port,
				logging: false,
				pool: {
					max: 5,
					idle: 30000,
					acquire: 60000,
				},
				// isolation level of each transaction
				// defaults to dialect default
				isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.REPEATABLE_READ
			});
		sequelize.authenticate().then(function() {
		}, function(err) {
			console.log('[EXCP]: database authentication failed due to: ' + err)
			return null;
		});
		return sequelize;
	}

	constructor() {
		this.hasEnv = true;
		this.sequelize  = PgSeqlDB.sequelize;
	}

	sync(hasForcing) {
		this.sequelize.sync({ force: hasForcing })
			//.sync({ force: true }) // drops and recreates
			.then(function(err) {
				console.log('[INFO]: sequelize sync performed.');
			}, function (err) {
				console.log('An error occurred while syncing:', err);
		});
	}

};

module.exports = PgSeqlDB;
