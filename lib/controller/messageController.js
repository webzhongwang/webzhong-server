var fs = require('fs'),
	conf = require('../common/conf'),
	tool = require('../common/tool'),
	message = require('../model/message').message,
	comCtrl = require('./comController');


// 查询列表
exports.lists = function(req, res){
	// res.header("Access-Control-Allow-Origin", "*");
	req.query = tool.trim(req.query);
	var page = parseInt(req.query.page) - 1,
		per_page = parseInt(req.query.per_page);
	var param = {};
	
	var promise = message.find(param, function(err, result){
		if(err) {
			res.end(JSON.stringify(tool.createRel(conf.status.error,false)));
		}
	}).limit(per_page).skip(page*per_page).sort({create_at:-1});

	promise.then(function(data){
		message.count(param, function(err, result){
			if(err) {
				res.end(JSON.stringify(tool.createRel(conf.status.error,false)));
			}
			var rel = {
				list: data,
				total: result
			}
			res.end(JSON.stringify(tool.createRel(conf.status.success, rel)))
		});
	});
};


// 添加
exports.create = function(req, res){
	tool.checkLogin(req, res);
	var param = {
		remark: req.body.remark,
		host: req.headers.host,
		ip: tool.getIp(req),
		create_at: new Date().getTime(),
		
	};
	message.create(param, function(er, rel){
		if(er) {
			res.end(JSON.stringify(tool.createRel(conf.status.error,false)));
		}
		res.end(JSON.stringify(tool.createRel(conf.status.success,true)));
	});
};

// 删除
exports.remove = function(req, res){
	var param = {_id:req.query.id};
	message.remove(param, function(err, result){
		if(err) {
            res.end(JSON.stringify(tool.createRel(conf.status.error,false)));
        }
		res.end(JSON.stringify(tool.createRel(conf.status.success,true)));
	});
};

// 导出excel
exports.exports = function(req,res){
	message.find({}, function(err, result){
		if(err) {
			res.end(JSON.stringify(tool.createRel(conf.status.error,false)));
		}
		var datas = [];
		result.forEach(function(item,row_index){
			datas[row_index] = [];
			datas[row_index][0] = item.company_name;
			datas[row_index][1] = item.company_user;
			datas[row_index][2] = item.custer_name;
			datas[row_index][3] = item.custer_user;
			datas[row_index][4] = item.goods_name;
			datas[row_index][5] = item.amount;
			datas[row_index][6] = item.total_money;
			datas[row_index][7] = item.paid_money;
			datas[row_index][8] = item.unpaid_money;
			datas[row_index][9] = item.kickback;
			datas[row_index][10] = item.sale_time;
			datas[row_index][11] = tool.datetime(item.update_at);
			datas[row_index][12] = tool.datetime(item.create_at);
			datas[row_index][13] = item.remark;

		});
		var cols = [
			{caption:'公司名', type:'string'},
			{caption:'公司联系人', type:'string'},
			{caption:'客户公司名', type:'string'},
			{caption:'客户公司联系人', type:'string'},
			{caption:'商品名', type:'string'},
			{caption:'数量', type:'string'},
			{caption:'总价', type:'string'},
			{caption:'预付', type:'string'},
			{caption:'欠款', type:'string'},
			{caption:'回扣', type:'string'},
			{caption:'交易时间', type:'string'},
			{caption:'更新时间', type:'string'},
			{caption:'创建时间', type:'string'},
			{caption:'备注', type:'string'},
		];
		comCtrl.exports({
			req: req,
			res: res,
			cols: cols,
			data: datas,
			name: 'log' + tool.datetime(new Date().getTime(),'download')
		});
	});
};
