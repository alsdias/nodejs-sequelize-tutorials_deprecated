/* coding: UTF-8
last update: 03/11/20 13:23:08
target: todo.js: todo's routing.
s.dias.andre.luiz@gmail.com # 03/11/20 13:23:08
*/
'use strict';
const DbSvc = require('./DbSvc');
/**
 * target: Todoitem's business service.
 *
 * @class TodoitemSvc
 */
class TodoitemSvc extends DbSvc {

  constructor() {
    super();
  }

  updateitem(todoitemDTO) {
		this.todoitemDAO.update(todoitemDTO);
	}

}

module.exports =  TodoitemSvc;