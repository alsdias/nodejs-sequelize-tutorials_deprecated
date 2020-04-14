/* coding: UTF-8
last update: 03/11/20 13:23:08
target: todo.js: todo's routing.
s.dias.andre.luiz@gmail.com # 03/11/20 13:23:08
*/
'use strict';
const DbSvc = require('./DbSvc');
const TodoDAO = require('../persistence/dao/TodoDAO');
const TodoitemDAO = require('../persistence/dao/TodoitemDAO');
const TodoHelper = require('../../models/TodoHelper');
const Tools = require('../../utils/Tools');

/**
 * target: Todo's business service.
 *
 * @class TodoSvc
 */
class TodoSvc extends DbSvc {

  constructor() {
    super();
    this.todoDAO = new TodoDAO();
		this.todoitemDAO = new TodoitemDAO();
  }

	createDb() {
		let timeoutPeriod = 3000;
		let hasDbCreation = ConfigSvc.checkDbCreation();
		if(hasDbCreation) {
			this.model();
			this.pgSeqlDB.sync(hasDbCreation);
			setTimeout( function() {
				ConfigSvc.disableDbCreation();
			} , timeoutPeriod);
		}
	}

	model() {
		this.todoDAO.model();
	}


  listall(res) {
		this.todoDAO.listall().then(function (todos) {
			res.status(200).render('todos', { title: 'TODOS', todos: todos });
		});
	}

	/**
	 * Populates the database with todos entities.
	 *
	 * @param {*} weekTitle
	 * @param {*} res
	 * @returns if successful, returns positive total of performed entities, otherwise negative total of performed entities.
	 * @memberof DbSvc
	 */
	populate(month , weekTitle) {
		let todoHelper = new TodoHelper();
		//  - RANDOMIC ITEM'S SIZE:
		//let todos =  todoHelper.populate();
		//  - FIXED ITEM'S SIZE:
		let todos =  todoHelper.populate();
    if (Tools.isNullEmptyArray(todos)) {
      return '[FAIL]: population skipped: no todo to persist';
		}
		let promises = [];
    let countTodos = 0;
    let countTodos2 = 0;
    let success = '<h3>Totals</h3>';
		todos.forEach(todoDTO => {
			countTodos += 1;
			todoDTO.title = month + '_' + todoDTO.title + '_' + weekTitle;
			promises.push(this.todoDAO.insert(todoDTO));
		});
		if(promises.length == 0) {
			return res.status(200).send('[FAIL]');
		}
		promises.forEach(promise => {
			countTodos2 += 1;
		});

		if(countTodos == countTodos2) {
			return countTodos;
		}
		return -countTodos2;
	}


	truncateDelete() {
		let tododao = new TodoDAO();
		this.todoitemDAO.truncate().then(function(todoDAO){
			console.log('[***]: todos deleted');
			tododao.delete();
			return;
		});
	}
  
}

module.exports =  TodoSvc;