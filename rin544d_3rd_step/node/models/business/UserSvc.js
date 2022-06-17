/**
 * @File   : userSvc.js
 * @Author :  ()
 * @Link   : 
 * @Date   : 16/06/2022 22:27:12
 */

const UserDB = require('../persistence/UserDB');

class UserSvc {

    userDB;
    createTable = false;
    populate = false;

    constructor() {
        this.userDB = new UserDB();
    }

    setCreateTable(createTable) {
        this.createTable = createTable;
    }

    setPopulate(populate) {
        this.populate = populate;
    }

    async list(res) {
        return await this.userDB.findAll(res);
    }


    async findById(id) {
        return await this.userDB.findById(id);
    }

    async findByName(name) {
        return await this.userDB.findByName(name);
    }

    async findAll(res) {
        return this.userDB.findAll(res);
    }

}

module.exports = UserSvc;