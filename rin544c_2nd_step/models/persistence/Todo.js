/* coding: UTF-8
last update: 03/11/20 13:24:04
target: Todo.js: <description here>
s.dias.andre.luiz@gmail.com # 03/11/20 13:24:04
L:\work\devcli_\javascript\jstopics\express\app_express_generator_ejs\docs\rin544c\node\models\Todo.js

- TOOLS:
.ttjscom;
.jstools
*/
'use strict';
module.exports = (sequelize, DataTypes) => {
  const Todo = sequelize.define('Todo', {
    title: DataTypes.STRING
  }, {});
  Todo.associate = function(models) {
	Todo.hasMany(models.TodoItem, {
		foreignKey: 'todoId',
	});
  };
  return Todo;
};
