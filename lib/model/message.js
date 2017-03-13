var mongoose = require("mongoose");	
var Schema = mongoose.Schema;
var schema = new Schema({
	remark: String,			// 内容
	host: String,			// 域名
	ip: String,			// 域名
	create_at: String,		// 留言时间	
});	
exports.message = mongoose.model('message', schema); 