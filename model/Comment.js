// 数据库操作
const mongoose = require('mongoose')
// 模型规则类
const { Schema } = mongoose
// 对象规则验证
const Joi = require('joi')

const ReplySchema = new Schema({
	// 回复人
	from_uid: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
	},
	// 被回复人
	to_uid: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
	},
	// 回复内容
	content: {
		type: String,
		minlength: 2,
	},
	// 点赞数量
	likeCount: {
		type: Number,
		default: 0
	},
	likes: {
		type: [mongoose.Schema.Types.ObjectId],
		ref: 'User'
	},
	createAt: {
		type: Date,
		default: Date.now
	},
	state: {
		type: Number,
		// 0 未批准 1 批准
		default: 1
	},
})


// 评论模型规则
const CommentSchema = new Schema({
	// 评论人
	author: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
	// 评论内容
	content: {
		type: String,
		minlength: 2,
		required: true
	},
	// 评论文章
	post: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Post',
		required: [true, '评论文章id不存在']
	},
	// 回复
	replies: [ReplySchema],
	// 状态
	state: {
		type: Number,
		// 0 未批准 1 批准
		default: 1
	},
	// 评论时间
	createAt: {
		type: Date,
		default: Date.now
	},
	// 点赞数量
	likeCount: {
		type: Number,
		default: 0
	},
	likes: {
		type: [mongoose.Schema.Types.ObjectId],
		ref: 'User'
	}
}, { versionKey: false })
// 创建分类集合
const Comment = mongoose.model('Comment', CommentSchema)

// 文章分类格式校验（路由级别）
const validateComment = comment => {
	// _id验证规则
	const objectIdReg = /^[0-9a-fA-F]{24}$/
	// 定义对象验证规则
	const schema = {
		author: Joi.string().regex(objectIdReg).required().error(new Error('用户ID非法')),
		content: Joi.string().min(2).required().error(new Error('评论不得少于2个字!')),
		post: Joi.string().regex(objectIdReg).required().error(new Error('评论文章ID非法')),
		state: Joi.number().valid(0, 1)
	}
	// 验证
	return Joi.validate(comment, schema, {
		// 检测到所有错误
		abortEarly: false,
		// 允许对象包含被忽略的未知键
		allowUnknown: true
	})
}

// async function create() {
// 	const a = await Comment.update({}, { $set: { Favorites: [] } }, { multi: true })
// await Post.findByIdAndUpdate('5f58481cf164c5391c3f6551', { slide: 2 }, { new: true })
// console.log(a)
// const post = await Post.create({
// 	title: '测试标题',
// 	author: '5f38f6e1333efc3740904bf2',
// 	content: '测试内容',
// 	category: '5f4cd6c51ac6832f506555a4',
// 	categoryChilren: '5f4cd6c51ac6832f506555a5'
// })
// }

// create()

// 导出模块成员
module.exports = {
	Comment,
	validateComment
}
