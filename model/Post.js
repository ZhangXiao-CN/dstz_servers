// 数据库操作
const mongoose = require('mongoose')
// 模型规则类
const { Schema } = mongoose

// 对象规则验证
const Joi = require('joi')
// 文章模型规则
const PostSchema = new Schema({
	// 标题
	title: {
		type: String,
		minlength: 2,
		maxlength: 100,
		required: [true, '请输入文章标题']
	},
	// 作者
	author: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
	// 状态
	state: {
		type: Number,
		// 0 草稿 1 发布
		required: true
	},
	// 创建时间
	createAt: {
		type: Date,
		default: Date.now
	},
	// 修改时间
	updateAt: {
		type: Date,
		default: Date.now
	},
	// markdwon
	content: {
		type: String,
		default: null
	},
	// html
	html: {
		type: String,
		default: null
	},
	// 摘要
	summary: {
		type: String,
		default: '...'
	},
	// 纯文本
	text: {
		type: String,
		default: null
	},
	imgList: {
		type: Array,
		default: null
	},
	// 标签
	tag: {
		type: [String],
		maxlength: 4,
		default: null

	},
	// 缩略图
	thumbnail: {
		type: String,
		default: null
	},
	slide: {
		type: Number,
		default: 0
	},
	// 所属分类
	category: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Category',
		required: [true, '分类信息不存在']
	},
	categoryChilren: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Category.children',
		default: null
	},
	// 点赞
	likesUser: {
		type: [mongoose.Schema.Types.ObjectId],
		ref: 'User'
	},
	// 收藏
	Favorites: {
		type: [mongoose.Schema.Types.ObjectId],
		ref: 'User'
	},
	meta: {
		// 看过数量
		views: { type: Number, default: 0 },
		// 喜欢数量
		likes: { type: Number, default: 0 },
		// 评论数量
		comments: { type: Number, default: 0 }
	}
}, { versionKey: false })

const Post = mongoose.model('Post', PostSchema)

// 时间更新
PostSchema.pre('findOneAndUpdate', function (next) {
	this.findOneAndUpdate({}, { updateAt: Date.now() })
	next()
})

// 文章格式校验
const validatePost = post => {
	// 定义对象验证规则
	const schema = {
		title: Joi.string().min(2).max(100).required().error(new Error('文章标题不符合验证验证规则')),
		state: Joi.number().valid([0, 1]).required().error(new Error('文章状态值非法')),
		thumbnail: Joi.any().empty(),
		content: Joi.string(),
	}
	// 验证
	return Joi.validate(post, schema, {
		// 检测到所有错误
		abortEarly: false,
		// 允许对象包含被忽略的未知键
		allowUnknown: true
	})
}



async function create() {
	const a = await Post.update({}, { $set: { Favorites: [] } }, { multi: true })
	// await Post.findByIdAndUpdate('5f58481cf164c5391c3f6551', { slide: 2 }, { new: true })
	// console.log(a)
	// const post = await Post.create({
	// 	title: '测试标题',
	// 	author: '5f38f6e1333efc3740904bf2',
	// 	content: '测试内容',
	// 	category: '5f4cd6c51ac6832f506555a4',
	// 	categoryChilren: '5f4cd6c51ac6832f506555a5'
	// })
}

// create()

// 导出模块成员
module.exports = {
	Post,
	validatePost
}