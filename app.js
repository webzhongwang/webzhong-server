var express = require('express'),
	bodyParser = require('body-parser'),
	// cookieParser = require('cookie-parser'),
	app = express(),
	com = require('./lib/controller/comController'),
	tool = require('./lib/common/tool'),
	conf = require('./lib/common/conf'),
	message = require('./lib/controller/messageController');


app.use(bodyParser.urlencoded({extend:true}));
app.use(bodyParser.json());

// 连接mongodb
var mongoose = require("mongoose");	
mongoose.connect('mongodb://localhost/webzhong');

// 全局设置
app.all('*', function(req, res, next){
	res.setHeader("Content-Type", "application/json");
	next();
});

// 路由
// 历史记录
app.get('/api/message/list',message.lists);
app.post('/api/message/create',message.create);
app.get('/api/message/remove',message.remove);
app.get('/api/message/exports',message.exports);


// 启动服务
var server = app.listen(8001, function () {
	var host = server.address().address;
	var port = server.address().port;
	console.log("应用实例，访问地址为 http://%s:%s", host, port)
});