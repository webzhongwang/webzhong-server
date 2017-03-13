var conf = require('./conf');

// 组装结果
exports.createRel = function(status, data, error_message) {
	return  {
		error_no: status.code,
		error_message: error_message || status.message,
		data: data
	}
};
// 返回结果
exports.sendRel = function(res, status, data) {
	var result = {
		error_no: status.code,
		error_message: status.message,
		data: data
	}
};
// 校验是否登录
exports.checkLogin = function(req, res) {
	var cookie = req.headers.cookie || '';
	if(cookie.indexOf('zws') < 0){
		res.end(JSON.stringify(this.createRel(conf.status.auth, false)));
	} else {
		res.cookie('zws', this.getCookie(req.headers.cookie,'zws'),{maxAge:conf.cookie_time});
	}
};
// 清空前后空格
exports.strTrim = function(str){
	return str.replace(/^\s*|\s*$/g,'');
};
// 清空前后空格
exports.trim = function(obj){
	for(var i in obj){
		obj[i] = obj[i].replace(/^\s*|\s*$/g,'');
	}
	return obj;
};
// objToArray
exports.toArray = function(obj){
	// console.log(obj)
	var arr = [];
	for(var i in obj){
		console.log(i)
		if (obj.hasOwnProperty(i)) {
			// console.log(i)
			arr.push({
				key: i,
				value: obj[i]
			});
		}
	}
	return arr;
}

// 获取cookie
exports.getCookie = function(str, key){
	var _this = this,
		arr = str.split(';'),
		val = '';
	arr.forEach(function(item){
		var arrIn = item.split('=');
		if(_this.strTrim(arrIn[0]) == _this.strTrim(key)) {
			val = arrIn[1];
		}
	})
	return val;
};

exports.initData = function(){
	var init_scope = conf.init_scope;
	var init_data = {};
	init_scope.forEach(function(item, index){
		for (var i in conf[item]) {
			if (!init_data[item]) init_data[item] = {};
			init_data[item][conf[item][i].code] = conf[item][i].name;
		}
	});
	return init_data;
};

exports.date = function(val){
	if (!val) return val;
    var val = parseInt(val);
    var date = new Date(val),
        y = date.getFullYear(),
        m = date.getMonth() + 1,
        d = date.getDate(),
        str = '';

    function check (value){
        return value > 9 ? value : '0' + value;
    }
    return '' + y + '-' + check(m) + '-' + check(d);
}
exports.datetime = function(val,type){
	if (!val) return val;
    var val = parseInt(val);
    var date = new Date(val),
        y = date.getFullYear(),
        m = date.getMonth() + 1,
        d = date.getDate(),
        h = date.getHours(),
        min = date.getMinutes(),
        s = date.getSeconds(),
        str = '';

    function check (value){
        return value > 9 ? value : '0' + value;
    }
    if(type == 'download'){
    	return '' + y + '-' + check(m) + '-' + check(d) + '-' + check(h) + '-' + check(min) + '-' + check(s);
    } else {
    	return '' + y + '-' + check(m) + '-' + check(d) + ' ' + check(h) + ':' + check(min) + ':' + check(s);
    }   
}
exports.getIp = function(req) {
	    var ip = req.headers['x-forwarded-for'] ||
	        req.ip ||
	        req.connection.remoteAddress ||
	        req.socket.remoteAddress ||
	        req.connection.socket.remoteAddress || '';
	    if(ip.split(',').length>0){
	        ip = ip.split(',')[0];
	        ip = ip.replace('::ffff:','');
	    }
	    return ip;
	};

