var conf = require('../common/conf'),
	tool = require('../common/tool'),
	pinyin = require('../common/pinyin'),
	nodeExcel = require('excel-export');

/*
 * cols: 表头
 * data: 数据 二维数组
 * name: 名称
 **/ 
exports.exports = function(option){
	var conf = {};
	conf.cols = option.cols;
	conf.rows = option.data;

	var result = nodeExcel.execute(conf);
	option.res.setHeader('Content-Type', 'application/vnd.openxmlformats;charset=utf-8');
	option.res.setHeader('Content-Disposition', 'attachment; filename=' + option.name + '.xlsx');
	option.res.end(result, 'binary');
}
