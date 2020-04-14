/* coding: UTF-8
last update: 03/11/20 13:17:15
s.dias.andre.luiz@gmail.com # 03/11/20 13:17:15
*/
'use strict';
const { Sequelize, Model, DataTypes, QueryTypes } = require("sequelize");
const PgSeqlDB = require('./PgSeqlDB');
const TodoitemDAO = require('./TodoitemDAO');
const Tools = require('../../../utils/Tools');
const TodoDTO = require('../../dto/TodoDTO');
const TodoitemDTO = require('../../dto/TodoitemDTO');
class TodoDAO {

  constructor() {
    this.pgSeqlDB = new PgSeqlDB();
    this.sequelize = this.pgSeqlDB.sequelize;
    this.todoitemDAO = new TodoitemDAO();
    this.todo = this.model();
  }

  model() {
    let TodoitemsDefinition = this.todoitemDAO.model();
    const TodoDefinition = this.sequelize.define('todo', {
      title: Sequelize.STRING
    }, {
      // don't use camelcase for automatically added attributes but underscore style
      // so updatedAt will be updated_at
      underscored: true,
      tableName: 'todo'
    });
    TodoitemsDefinition.belongsTo(TodoDefinition , {
      foreignKey: 'todo_fk',
      allowNull: false
    });
    TodoDefinition.hasMany(TodoitemsDefinition, {
      foreignKey: 'todo_fk',
      allowNull: false
    })
    return TodoDefinition;
  }

  static stringfy(seqlDO) {
    if (seqlDO.dataValues === undefined) {
      return "insertion failure"
    }
    return JSON.stringfy('id: ' + seqlDO.dataValues.id + ', ' + seqlDO.dataValues.title);
  } 

    /**
   * Persists a todo entity and optionally its items.
   * todoSDO stands for todo Sequelize Data Object
   * @param {*} title
   * @param {*} description
   * @returns
   * @memberof TodoDAO
   */
  async insert(todoDTO) {
    if(Tools.isNullEmpty(todoDTO.title)) {
      return '';
    }
    return this.todo.create({
      title: todoDTO.title
    }).then(function(todoSDO) {  // sequelize returns it SDO (Sequelize Data Object)
      todoDTO.id = TodoDTO.fromSDO(todoSDO).id;
      let todoitemDAO = new TodoitemDAO();
      if (todoDTO.items === undefined || todoDTO.items === null || todoDTO.items.length == 0) {
        todoDTO.items = [];
        let todoitemDTO = new TodoitemDTO(null, null, '');
        todoDTO.items.push(todoitemDTO);
      }
      todoDTO.items.forEach(todoitemDTO => {
        todoitemDTO.fk = todoDTO.id;
        todoitemDAO.insert(todoitemDTO).then(function(todoitemSDO) {
          todoitemDTO = TodoitemDTO.fromSDO(todoitemSDO);
          todoDTO.items.push(todoitemDTO);
        });
      });
      return todoDTO;
    });
  }

  async listall() {
    return this.todo.findAll({ include: this.todoitemDAO.model() });
  }

  async delete(id) {
    await this.todo.destroy({ truncate: { cascade: true, where: {id: id} } });
  }
  
}


module.exports =  TodoDAO;