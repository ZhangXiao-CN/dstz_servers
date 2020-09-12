// 数据库操作
const mongoose = require('mongoose')
// 模型规则类
const { Schema } = mongoose
// 对象规则验证
const Joi = require('joi')
// hash密码
const bcrypt = require('bcryptjs')

// 用户集合规则
const UserSchema = new Schema({
	// 昵称
	nickName: {
		type: String,
		required: true,
		minlength: 2,
		maxlength: 15
	},
	// 邮件
	email: {
		type: String,
		required: true,
		unique: true
	},
	// 密码
	password: {
		type: String,
		required: true,
	},
	// 角色
	role: {
		type: String,
		// admin 超级管理员 normal 普通用户
		default: 'normal',
		enum: ['admin', 'normal']
	},
	// 头像
	avatar: {
		type: String,
		default: null
	},
	// 创建时间
	createTime: {
		type: Date,
		default: Date.now
	},
	// 状态
	status: {
		// 0 未激活 1 激活
		type: Number,
		required: true,
		default: 1
	},
	// 性别
	gender: {
		type: String,
		enum: ['保密', '男', '女'],
		default: '保密'
	},
	// 网址
	site: {
		type: String,
		maxlength: 255,
		default: null
	},
	// 签名
	autograph: {
		type: String,
		maxlength: 255,
		default: null
	},
	// 关注
	attention: {
		type: [mongoose.Schema.Types.ObjectId],
		ref: 'User',
		default: null
	},
	// 粉丝
	fans: {
		type: [mongoose.Schema.Types.ObjectId],
		ref: 'User',
		default: null
	},
	// 收藏
	Favorites: {
		type: [mongoose.Schema.Types.ObjectId],
		ref: 'Post',
		default: null
	},
	thumb: {
		type: String,
		default: null
	}
}, { versionKey: false })

// 用户集合类
const User = mongoose.model('User', UserSchema)

// 注册数据格式校验
const validateUser = user => {
	// 定义对象验证规则
	const schema = {
		nickName: Joi.string().min(2).max(15).required().error(new Error('昵称最少两位字符,最多15位字符')),
		email: Joi.string().regex(/^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/).required().error(new Error('邮箱格式非法')),
		password: Joi.string().required().regex(/^[a-zA-Z0-9]{3,16}$/).error(new Error('密码最少3位,最多16位')),
		status: Joi.number().valid(0, 1),
		role: Joi.string().valid('normal', 'admin')
	}
	// 验证
	return Joi.validate(user, schema, {
		// 检测到所有错误
		abortEarly: false,
		// 允许对象包含被忽略的未知键
		allowUnknown: true
	})
}

// 登录数据格式校验
const validateLogin = user => {
	// 定义对象验证规则
	const schema = {
		email: Joi.string().regex(/^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/).required().error(new Error('邮箱或密码错误')),
		password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).error(new Error('邮箱或密码错误'))
	}
	// 验证
	return Joi.validate(user, schema, {
		// 检测到错误立即返回
		abortEarly: true
	})
}

const validateEmail = user => {
	// 定义对象验证规则
	const schema = {
		email: Joi.string().regex(/^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/).required().error(new Error('邮箱格式非法')),
	}
	// 验证
	return Joi.validate(user, schema, {
		// 检测到错误立即返回
		abortEarly: true
	})
}

// 创建默认用户
// async function createUser() {
// 	// 生成盐
// 	const salt = await bcrypt.genSalt(10)
// 	// 使用盐对密码进行加密
// 	const password = await bcrypt.hash('123456', salt)

// 	const user = await User.create({
// 		nickName: '欺孀',
// 		email: 'qishuang@vip.com',
// 		password: password,
// 		role: 'admin',
// 		avatar: null,
// 		createTime: new Date,
// 		status: 1

// 	})
// }

// createUser()

// 导出对象
module.exports = {
	User,
	validateUser,
	validateLogin,
	validateEmail
}