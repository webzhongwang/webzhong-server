// auth认证的接口
exports.auth_path = [
	'/api/init',
	'/api/init_setting',
	'/api/user/login',
	'/api/user/logout'
];

// 初始化数据
exports.init_scope = ['auth','user_status','history_type'];

// 接口返回状态
exports.status = {
	success: {
		code: 0,
		message: '成功'
	},
	error: {
		code: 1,
		message: '失败'
	},
	auth: {
		code: 2,
		message: '无权限'
	},
};

// 角色
exports.auth = {
	base: {
		code: '1',
		name: '超级管理员'
	},
	admin: {
		code: '2',
		name: '管理员'
	},
	user: {
		code: '9',
		name: '普通用户'
	}
};

// 用户状态
exports.user_status = {
	active: {
		code: '1',
		name: '激活'
	},
	lock: {
		code: '2',
		name: '冻结'
	},
	remove: {
		code: '3',
		name: '移出'
	}
};


// 默认密码
exports.password = {
	code: '111111',
	name: '初始密码'
};

// cookie有效期
exports.cookie_time = 30*60*1000
