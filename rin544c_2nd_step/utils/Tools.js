/* coding: UTF-8  */

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

	static replaceAll(string, token, newtoken) {
		while (string.indexOf(token) != -1) {
			string = string.replace(token, newtoken);
		}
		return string;
	}

	static showAjaxLoader() {
		$('#screen').css({
			"display" : "block",
			opacity : 0.7,
			"width" : $(document).width(),
			"height" : $(document).height()
		});
		$('#wait').css('display', 'block');
	}

	static hideAjaxLoader() {
		$('#screen').css('display', 'none');
		$('#wait').css('display', 'none');
	}

	static validarCPF(cpf) {
			cpf = cpf.replace(/[^\d]+/g,'');
			if(cpf == '') return false;
			// Elimina CPFs invalidos conhecidos
			if (cpf.length != 11 || 
					cpf == "00000000000" || 
					cpf == "11111111111" || 
					cpf == "22222222222" || 
					cpf == "33333333333" || 
					cpf == "44444444444" || 
					cpf == "55555555555" || 
					cpf == "66666666666" || 
					cpf == "77777777777" || 
					cpf == "88888888888" || 
					cpf == "99999999999")
					return false;
			
			// Valida 1o digito
			add = 0;
			for (var i=0; i < 9; i ++)
					add += parseInt(cpf.charAt(i)) * (10 - i);
			rev = 11 - (add % 11);
			if (rev == 10 || rev == 11)
					rev = 0;
			if (rev != parseInt(cpf.charAt(9)))
					return false;
			
			// Valida 2o digito
			add = 0;
			for (var i = 0; i < 10; i ++)
					add += parseInt(cpf.charAt(i)) * (11 - i);
			rev = 11 - (add % 11);
			if (rev == 10 || rev == 11)
					rev = 0;
			if (rev != parseInt(cpf.charAt(10)))
					return false;
					
			return true;
			
	}

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

	/*
	silvadias.andreluiz@gmail.com # 03/25/14 12:30:03
	*/
	static isInt(value) {
		return !isNaN(parseInt(value));
	}

	/*
	silvadias.andreluiz@gmail.com # 03/25/14 12:30:03
	*/
	static isFloat(value) {
		return !isNaN(parseInt(value));
	}

	/*
	silvadias.andreluiz@gmail.com # 03/25/14 12:30:03
	*/
	static isNumber(value) {
		return !(!isFloat(value) && !isInt(value));
	}

	/*
	silvadias.andreluiz@gmail.com # 03/25/14 12:30:03
	*/
	static trim(str) {
		if(isNullEmpty(str)) return str;
		return str.replace(/ˆ\s+|\s+$/g,"");
	}


	/*
	Converts a 2-dimensional array of type a key-value to an array of objects.
	@param array2  2-dimensional array of type a key-value.
	@param attrib1  1st object's attribute name.
	@param attrib2  2nd object's attribute name.
	@return array of an object containing two attributes of type a key-value.
	Example:
	silvadias.andreluiz@gmail.com # 03/25/14 12:30:03
	var arrayObj =	[[1,"Desconhecida"],[2,"Zona Leste"],[3,"Zona Norte"],[4,"Zona Oeste"],[5,"Zona Sul"]];
	var namedArray = array2ToJson(arrayObj, 'id', 'descricao');
	Returns:
		[{"id":2,"descricao":"Zona Leste"},{"id":3,"descricao":"Zona Norte"},{"id":4,"descricao":"Zona Oeste"},{"id":5,"descricao":"Zona Sul"}]
	*/
	static array2ToObjArray(array2, attrib1, attrib2) {
		if(isNullEmptyArray(array2) || isNullEmptyArray(attrib1) || isNullEmptyArray(attrib2)) return '';
		var narray = [];
		for(var i = 0; i < array2.length; i++) {
			var array2i = trim(array2[i]);
			if (isNullEmptyArray(array2i)) continue;
			var obj = new Object();
			obj[attrib1] =array2i[0];
			obj[attrib2] =array2i[1];
			narray.push(obj);
		}
		return narray;
	};

	/** Function count the occurrences of substring in a string.<br />
		Ex.: alert(occurrences('value\nJoao\nval', '\n'));<br />
	* @param {String} string   Required. The string;
	* @param {String} subString    Required. The string to search for;
	* @param {Boolean} allowOverlapping    Optional. Default: false;
	* @FROM: [RIN271]
	*/
	static occurrences(string, subString, allowOverlapping){

			string+=""; subString+="";
			if(subString.length<=0) return string.length+1;

			var n=0, pos=0;
			var step=(allowOverlapping)?(1):(subString.length);

			while(true){
					pos=string.indexOf(subString,pos);
					if(pos>=0){ n++; pos+=step; } else break;
			}
			return(n);
	}


	/*
		Counts carriage returns (CR).<br />
			Ex.: alert(countCarriageReturn('value\nJoao\nval'));<br />
		@param str:string
		@return number of occurrences:integer
		@FROM: [RIN271]
	*/
	static countCarriageReturn(str) {
		if(typeof(str) != "string") return 0;
		var count = str.match(/\n/g);  
		if (count != null) return count.length;
		else return 0;
	}


	/*
		Converts a string into text(array of strings)
		@param addReturn adds a carriage return (CR).
		@return text, otherwise empty.
	*/
	static str2text(str, addReturn) {
		if(isNullEmpty(str)) return new Array();
		var operationalDelimiter = '7897--###@@@###--7897';
		var text = str.replace( /\n/g, operationalDelimiter ).split( operationalDelimiter );
		if (addReturn) {
			for(var i = 0;i<text.length;i++) text[i] = text[i] + '\n';
		} 
		return text;
	}


	/*
		Concatenates a string to the end of each string of the array.
		@param tail the string to be concatenated to each string of the array.
		@return concatenated array, otherwise empty.
	*/
	static arrayConcats(array, tail) {
		if(isNullEmptyArray(array)) return new Array();
		for(var i = 0;i<array.length;i++) array[i] = array[i] + tail;
		return array;
	}


	/*
		Converts a String[] object into textstr object(a concatenated string using CR as delimiter used to represent a text).
		@param json json object which may be a string or an array.
		@return textstr (a text representation in just one delimited string using CR as delimiter).
	*/
	static stringArray2textstr(stringArray) {
		var str = '';
		if (stringArray instanceof Array) {
			for(var i = 0;i<stringArray.length;i++) {
				str += stringArray[i].replace( /,/g, '\n');
				if(str[length-1] != '\n') str = str + '\n';
			}
		} else if (stringArray instanceof String) {
			str = stringArray.replace( /,/g, '\n');
		}
		return str;
	}


	static hasToken(str, regex) {
		if(isNullEmpty(str)) return false;
		var regexpr = new RegExp(regex, 'g');
		return regexpr.test(str);
	}

	/*
	Calculates the message's height.
	Ex.:
		var str = 'hellos\nWorlds';
		var lineLength = 3;
		var lineHeight = 33;
		alert(calculateMsgHeight(str, lineLength, lineHeight));

	@param msglen message length.
	@return height:integer
	*/
	static calculateMsgHeight(msg, lineLength, lineHeight) {
		//alert(msg);
		if(isNullEmpty(msg)) return 0;
		var text = str2text(msg, false);
		//alert("text[i].length = " + text.length);
		var counter = 0;
		var tail = 0;
		for(var i = 0;i<text.length;i++) {
			var len = text[i].length;
			if (len == 0) continue;
			len += tail;
			var times = parseInt(len/lineLength);
			counter += times;
			tail += len - (times * lineLength);
		}
		if (tail > 0 ) counter += 1;
		//alert("counter = " + counter);
		return lineHeight * counter;
	}


	/**
	 * Converts a string array to a string.
	 * @author andre.luiz@proeducacao.com.br
	 * @param array
	 * @return string
	 */
	static array2str(array) {
		if(isNullEmptyArray(array)) return "";
		var str = '';
		for(var i=0;i<array.length;i++) {
			str += trim(array[i]) + " , ";
		}
		return str;
	}


	/**
	 * URL encoding.
	 * @author BASED:[RIN276]
	 * @param str
	 * @returns URL encoded string.
	 */
	static urlEncode(str) {
		if(isNullEmpty(str)) return '';
		return encodeURIComponent(str).replace(/'/g,"%27").replace(/"/g,'%22');
	}

	/**
	 * URL decoding.
	 * @author BASED:[RIN276]
	 * @param str
	 * @returns URL decoded string.
	 */
	static urlDecode(str) {
		if(isNullEmpty(str)) return '';
		return decodeURIComponent(str.replace(/\+/g,  " "));
	}


	/**
	 * TODO
	 * Encodes string to be package within PacDTO object.
	 * @author andre.luiz@proeducacao.com.br
	 * @param str
	 * @returns {String}
	 */
	static pacDtoEncode(str) {
		if(isNullEmpty(str)) return '';
		str = str.replace(/\\n/g,  "####CR####");
		str = str.replace(/\"/g,  "####QT####");
		str = str.replace(/:/g,  "####SC####");
		return str;
	}

	/**
	 * Switches the plus signal in order to be scaped.
	 * Useful with URI. Example:
	 * var expr = "a+b"
	 * http://localhost:8081/sisgit/oper?text=" + expr
	 * If the plus signal in the expr variable is not switched, the javascript parser will see it as:
	 * [WRONG]: http://localhost:8081/sisgit/oper?text=" + a + b
	 * So, do:
	 * [RIGHT]: http://localhost:8081/sisgit/oper?text=" + switchPlus(expr)
	 * @author adias
	 * @param url
	 * @returns
	 */
	static switchPlus(str) {
		if(isNullEmpty(str)) return '';
			return escape(str).replace( "+", "%2B" );
	}

	/**
	 * URI encoding switching the '+' signal in order to scape it from javascript parser.
	 * NOTE: incompatible with java.net classes. Causes illegible chars.
	 * @author andre.luiz@proeducacao.com.br
	 * @param str
	 * @returns
	 */
	static encode2uri(str) {
		if(isNullEmpty(str)) return '';
		return encodeURI(switchPlus(str), "UTF-8");
	}

	//RIN278

	strlpad = function(str, pad, len) {
		while (str.length < len) {
			str = pad + str;
		}
		return str;
	};

	strrpad = function(str, pad, len) {
		while (str.length < len) {
			str = str + pad;
		}
		return str;
	};

	str2hex = function(str) {
		var output = "";
		for (var i = 0; i < str.length; i++) {
			output += strlpad(str.charCodeAt(i).toString(16), "0", 2).toUpperCase();
		}
		return output;
	}

	hex2str = function(hex) {
		var s = strpart(hex, 2), output = "";
		for (var i = 0; i < s.length; i++) {
			output += String.fromCharCode(parseInt(s[i], 16));
		}
		return output;
	}

	/* Copyright 2012 Nathan Lex
	*
	* This program is free software: you can redistribute it and/or modify
	* it under the terms of the GNU General Public License as published by
	* the Free Software Foundation, either version 3 of the License, or
	* (at your option) any later version.
	*
	* This program is distributed in the hope that it will be useful,
	* but WITHOUT ANY WARRANTY; without even the implied warranty of
	* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	* GNU General Public License for more details.
	*
	* You should have received a copy of the GNU General Public License
	* along with this program.  If not, see <http://www.gnu.org/licenses/>.
	*/

	//Split a string every nth character, starting from the left.
	//If n is negative, string will be split starting from the right.
	strpart = function(str, n) {
			if (n > 0) {
				return str.match(new RegExp(".{1," + n + "}","g"));
			} else if (n < 0) {
				var an = Math.abs(n), t1 = (Math.ceil(str.length / an) * an) - str.length, t2 = "";
				for (var i = 0; i < t1; i++) {
					t2 += "_";
				}
				t2 += str;
				t2 = t2.match(new RegExp(".{1," + an + "}","g"));
				t2[0] = t2[0].substr(t1, an - t1);
				return t2;
			}
	}

	////RIN278

	/**
	 * Converts to UTF-8.
	 * It forces UTF-8 enconding, since javascripts dynamically switches from an enconding to another depending on environment.
	 * For instance, it may read the field content as ISO-8851-9 if it contains an accented char ('á'), 
	 * but if the same field has a chinese ideogram, it switches to UTF-8.
	 * How it works:
	 * unescape() interprets the stream of percent escaped bytes as UTF-8.
	 * encodeURIComponent() to turn a stream of bytes into a percent-escaped stream of  bytes.
	 * @author [RIN279]
	 * @param string
	 * @returns
	 */
	static forceUnicodeEncoding(string) {
		return unescape(encodeURIComponent(string));
	}


	//last update: 12/26/2011 02:51:56 PM
	//alsdias@yahoo.com.br # 12/26/2011 02:51:56 PM
	// target: replaces a substring over a text using regex.
	// param:
	//   text the text to be parsed.
	//   replaced the string to be replaced.
	//   replacement the string to replace the teplaced argument.
	//  return: replaced string.
	// interface: str=replacex_(text:str, replaced:str, replacement:str)
	static replacex(text, replaced, replacement) {
		if (isNullEmpty(text)) return '';
		if (isNullEmpty(replaced)) return text;
		var re = new RegExp(replaced, "gm");
		return text.replace(re, replacement);
	}

	/**
	 * Converts a text(array of string terminated by CR (\n)) to a string line.
	 * @author andre.luiz@proeducacao.com.br
	 * @param text
	 * @returns {String}
	 */
	static text2line(text) {
		if (isNullEmptyArray(text)) return '';
		var line = '';
		for(var i=0; i<text.length;i++) line += text[i] + '\n';
		return line;
	}

	/**
	 * Converts a string line to a text(array of string terminated by CR (\n)).
	 * @author andre.luiz@proeducacao.com.br
	 * @param line
	 * @returns
	 */
	static line2text(line) {
		var sarray = new Array();
		if (isNullEmpty(line)) return sarray;
		if (line == '\n') sarray[0] = line;
		else return line.split('\n');
	}

		/**
	 * @author silvadias.andreluiz@gmail.com
	 * @param email:string
	 * @param locale:string
	 * @returns if successful, returns empty, otherwise locale message.
	 */
	static validateEmail(email, locale) {
		var keys = ['login.email.rule','login.email.missing'];
		var msgs = messages(keys, locale);
		if(isNullEmpty(email)) return msgs['login.email.missing'];
		email = trim(email);
		var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		if(!re.test(email)) return msgs['login.email.rule'];
		return '';
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