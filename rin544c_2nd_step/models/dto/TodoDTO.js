'use strict';
var Tools = require('../../utils/Tools');

class TodoDTO {

  // CONSTRUCTOR MUST BE UNIQUE, SO A SUGGESTIVE NAME
  constructor(id, title, items) {
    this.id = id;
    this.title = title;
    if(!Tools.isNullEmptyArray(items)) {
      this.items = items;
    } else {
      console.log('hhhh')
    }
  }

  print() {
    let itemset = '';
    for(let i = 0; i < this.items.length; i++) {
      itemset = itemset + this.items[i].print() + ', ';
    }
    return this.id + ': ' + this.title + ', items[ ' + itemset + ']';
  }

}

module.exports = TodoDTO;
