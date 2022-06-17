var Dbconfig = require('../../config/config.json');
var Sequelize = require('sequelize');

/**
 * Database service using Sequelize and PostgreSQL.
 *
 * @class PgSeqlDB
 */
class PgSeqlDB {

    dbconfig;
    sequelize;
    createTables = false;
    userModel;

    configuration() {
        // process.env.APP_ENV captures what was set in the run.bat in the line: SET APP_ENV=dev
        if (process.env.APP_ENV == 'dev') {
            console.log('[INFO]: database configuration set to development.')
            return Dbconfig.development;
        } else if (process.env.APP_ENV == 'prod') {
            console.log('[INFO]: database configuration set to production.');
            return Dbconfig.production;
        } else if (process.env.APP_ENV == 'cloud') {
            console.log('[INFO]: database configuration set to cloud.');
            return Dbconfig.cloud;
        } else if (process.env.APP_ENV == 'test') {
            console.log('[INFO]: database configuration set to test environment.')
            return Dbconfig.test;
        } else {
            console.log('[WARN]: database configuration not defined, assuming default (dev): ' + Dbconfig.development.database);
            return Dbconfig.development;
        }
    }


    constructor(createTables) {
        this.createTables = createTables;
        this.dbconfig = this.configuration();
        this.sequelize = this.connection();
        this.defineUserModel();
        this.syncDb(this.createTables);
    }

    defineUserModel() {
        this.userModel = this.sequelize.define('User', {
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
        });

    }

    connection() {
        console.log('[INFO]: authenticating database: ' + this.dbconfig.database)
        let sequelize = new Sequelize(this.dbconfig.database, this.dbconfig.username, this.dbconfig.password, {
            dialect: this.dbconfig.dialect,
            port: this.dbconfig.port,
        });
        sequelize.authenticate(this.dbconfig).then(function () {
            console.log('[INFO]: database authenticated');
        }, function (err) {
            console.log('[EXCP]: database authentication failed due to: ' + err)
        });
        return sequelize;
    }

    /**
     * @param  {boolean} createTables if true, creates the tables.
     */
    syncDb(createTables) {
        this.sequelize.sync({
                force: createTables
            })
            .then(function (err) {
                //console.log('[INFO]: sequelize sync done');
            }, function (err) {
                console.log('An error occurred while creating the table:', err);
            });
    }


    insertUser(name, pass) {
        this.userModel.create({
            username: name,
            password: pass
        }).then(function (user) {
            console.log('[INFO]: ' + user.dataValues.username + ' persisted');
        });
    }

    populate() {
        this.insertUser("John Doe", "secret1");
        this.insertUser("Mary Doe", "secret2");
        this.insertUser("Jane Doe", "secret3");
    }

    showConfig() {
        console.log(this.dbconfig);
    }

    findById(id) {
        this.userModel.findByPk(id).then(function (user) {
            console.log('------------------------------------------');
            console.log('\n[INFO]: found: ' + user.id + ", " + user.username + '\n');
        });
    }

    findByName(name) {
        this.userModel.findAll({
            where: {
                username: name
            }
        }).then(function (data, err) {
            if (!data) {
                console.log('------------------------------------------');
                console.log('[FAIL]: user instance not found due to: ' + err);
                console.log('------------------------------------------');
            } else {
                console.log('------------------------------------------');
                //console.log(data);
                for (let u in data) {
                    console.log(data[u].dataValues);
                }
                console.log('------------------------------------------');
            }
        })
    }

    findAll(res) {
        this.userModel.findAll().then(function (data, err) {
            if (!data) {
                console.log('------------------------------------------');
                console.log('[FAIL]: user instance not found due to: ' + err);
                console.log('------------------------------------------');
            } else {
                let list = [];
                for (let u of data) {
                    list.push(u.dataValues);
                }
                return res.render('users', {
                    title: 'USERS',
                    users: list
                });

            }
        })
    }

};


module.exports = PgSeqlDB;