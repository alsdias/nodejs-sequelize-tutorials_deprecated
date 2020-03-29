/**
 * @SYNC: 
 * Using class:
 * y;Tools.js<memo<javascript;.
 * Using function:
 * y;tools.js<memo<javascript;.
 *
 * @class Tools
 */
class Tools { 


	/*
	s.dias.andre.luiz@gmail.com # 05/20/14 16:23:17
	*/
	static isNullEmpty(str) {
		return (typeof str == 'undefined'  || str == null || str.length == 0 || !typeof 'string')?true:false;
	}

	/*
	silvadias.andreluiz@gmail.com # 03/25/14 12:30:03
	*/
	static isNullEmptyArray(obj) {
		return (typeof obj == 'undefined'  || obj == null || obj.length == 0)?true:false;
	}


	/**
	 * Generates randomic numbers.
	 *
	 * Example:
	 * var Tools = require('./utils/Tools');
	 * let nums = Tools.randomIntInc(20, 10);
	 * nums.forEach( x=&gt; {console.log(x)});
	 * console.log('------------------------------------------------');
	 * nums = Tools.randomIntInc(3,6);
	 * nums.forEach( x=&gt; {console.log(x)});
	 *
	 * @static
	 * @param {*} max maximum number starting at 0 up to maix including it.
	 * @param {*} size array length - number of randomic numbers to be generated.
	 * @returns Integer array
	 * @memberof Tools
	 */
	static randomIntInc(max, size) {
		let nums = [];
		for(let i = 0; i < size; i++) {
			nums.push(Math.floor(Math.random() * (max + 1)));
		}
		return nums;
	}

}

module.exports = Tools;