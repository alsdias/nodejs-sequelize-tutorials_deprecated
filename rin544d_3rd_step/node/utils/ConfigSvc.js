'use strict';
const FileTool = require('./FileTool');

class ConfigSvc {

  static Dbconfig = require('../config/config.json');

  static hasDbCreation() {
    var jsonAnwer = FileTool.readJson('./config/' + require('../config/config.json').db_config);
    if (jsonAnwer.error) {
      console.log(jsonAnwer.error);
      return false;
    } else {
      return (jsonAnwer.text.create_db === 'true') ? true : false;
    }
  }

  static disableDbCreation() {
    let disableJson = JSON.parse('{"create_db" : "false"}');
    let error = FileTool.writeJson('./config/' + require('../config/config.json').db_config, disableJson);
    if(error) {
      console.log(error);
      return false;
    }
    return true;
  }
  
  static checkDbCreation() {
    if(ConfigSvc.hasDbCreation()) {
      console.log('[INFO]: db creation enabled, next operation disabled.');
      return true;
    }
    return false;
  }

}

module.exports =  ConfigSvc;