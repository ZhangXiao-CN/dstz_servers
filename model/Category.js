// 数据库操作
const mongoose = require('mongoose')
// 模型规则类
const { Schema } = mongoose
// 对象规则验证
const Joi = require('joi')

const ChildrenCategorySchema = new Schema({
	// ischildren: { type: Boolean },
	childrenTitle: { type: String, minlength: 2, maxlength: 30 },
	date: { type: Date, default: Date.now },
})

// 文章模型规则
const CategorySchema = new Schema({
	// 分类名称
	title: {
		type: String,
		minlength: 2,
		maxlength: 16,
		required: true,
		unique: true
	},
	// 子类类名
	children: [ChildrenCategorySchema],
	// children: [{
	// 	childrenTitle: { type: String, minlength: 2, maxlength: 30, unique: true },
	// 	date: { type: Date, default: Date.now },
	// }],
	// default: []
	// 创建时间
	createAt: {
		type: Date,
		default: Date.now
	}
}, { versionKey: false })

// 创建分类集合
const Category = mongoose.model('Category', CategorySchema)

// 文章分类格式校验（路由级别）
const validateCategory = category => {
	// 定义对象验证规则
	const schema = {
		title: Joi.string().min(2).max(30).required().error(new Error('分类名称支持2-16个字符')),
		createAt: Joi.date().default(Date.now, 'created time'),
		// chilren: Joi.array().error(new Error('子类名称支持2-30个字符')),
	}
	// 验证
	return Joi.validate(category, schema, {
		// 检测到所有错误
		abortEarly: false,
		// 允许对象包含被忽略的未知键
		allowUnknown: true
	})
}

async function create() {
	const category = await Category.create({
		title: '闲聊'
	})
}

// create()


// 导出模块成员
module.exports = {
	Category,
	validateCategory
}
