var Dbconfig = require('../../config/config.json');
var Sequelize = require('sequelize');

/**
 * Database service using Sequelize and PostgreSQL.
 *
 * @class PgSeqlDB
 */
class PgSeqlDB {

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
		let sequelize = new Sequelize(dbconfig.database, dbconfig.username, dbconfig.password, {
				dialect: "postgres", // or 'sqlite', 'postgres', 'mariadb'
				port:    dbconfig.port, // or 5432 (for postgres)
			});
		sequelize.authenticate().then(function() {
		}, function(err) {
			console.log('[EXCP]: database authentication failed due to: ' + err)
		});
		return sequelize;
	}

	constructor() {
		this.hasEnv = true;
		this.sequelize  = PgSeqlDB.singleton();
	}

	syncDb() {
		this.sequelize.sync({ force: false }) // drops and recreates
			//.sync({ force: true }) // drops and recreates
			.then(function(err) {
				console.log('It worked!');
			}, function (err) {
				console.log('An error occurred while creating the table:', err);
			});
		
	}

	createDb() {
		this.createTables();
		this.syncDb();
	}

	createTables() {
		let user = this.createUserTable();
		console.log(user);
	}

	createUserTable() {
		// select * from public.user;
		let user = this.sequelize.define('User', {
			username: Sequelize.STRING,
			password: Sequelize.STRING
		}, {
			tableName: 'user',
			//timestamps: false   // this will deactivate the timestamp columns
		});
		return user;
	}

	populate() {

		if (this.hasEnv) {
			const dbconfig=config['development'];
		//	console.log(dbconfig);
		//	console.log(config['db_dev_url']);
		//	console.log(dbconfig.username);


				//NOT NECESSARY SINCE USED CLI CMD: sequelize db:migrate
		//	sequelize.sync({ force: true }) // drops and recreates
		//	  //.sync({ force: true }) // drops and recreates
		//	  .then(function(err) {
		//	  }, function (err) {
		//	  });

		} else {
		}
	}
};

module.exports = PgSeqlDB;
