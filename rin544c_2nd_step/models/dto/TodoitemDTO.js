'use strict';

class TodoitemDTO {

  constructor(fk, id, description) {
    this.fk = fk;
    this.id = id;
    this.description = description;
  }

  print() {
    return this.fk + ':' + this.id + ': ' + this.description;
  }
}

module.exports = TodoitemDTO;