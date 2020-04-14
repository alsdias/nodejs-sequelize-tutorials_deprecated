/* coding: UTF-8
last update: 03/11/20 13:17:15
s.dias.andre.luiz@gmail.com # 03/11/20 13:17:15
*/
'use strict';
const { Sequelize, Model, DataTypes } = require("sequelize");
const PgSeqlDB = require('./PgSeqlDB');

class TodoitemDAO {

  constructor() {
    this.pgSeqlDB = new PgSeqlDB();
    this.sequelize = this.pgSeqlDB.sequelize;
    this.todoitem = this.model();
  }

  model() {
    return this.sequelize.define('todoitem', {
      id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      description: Sequelize.STRING,
      todo_fk: {
        type: Sequelize.INTEGER,
        allowNull: false,
        foreignKey: true
      }
    }, {
      // don't use camelcase for automatically added attributes but underscore style
      // so updatedAt will be updated_at
      underscored: true,
      tableName: 'todoitem'
    });
  }

  async insert(todoitemDTO) {
    return this.todoitem.create({
        description: todoitemDTO.description,
        todo_fk: todoitemDTO.fk
    }).then(function(todoitemSDO) {
        //console.log(todoitemSDO);
        return todoitemSDO;
    })
  }

  async truncate() {
    await this.todoitem.destroy({
      truncate: true
    }).then(function(){
      console.log('[***]: todositems truncated');
    });
  }

  async delete(todoitemDTO) {
    await this.todoitem.destroy({
      where: { id: todoitemDTO.id }
    }).then(function(){
      //console.log('[***]: todositem deleted');
    });
  }

  async update(todoitemDTO) {
    return await this.todoitem.update({
       description: todoitemDTO.description,
       todo_fk: todoitemDTO.fk
      }, {
      where: {
        id: todoitemDTO.id
      }
    });
  }

}

module.exports =  TodoitemDAO;