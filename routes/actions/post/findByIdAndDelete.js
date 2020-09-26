// 验证模块
const Joi = require('joi')
// 用户模块
const { Post } = require('../../../model/Post')
const { Comment } = require('../../../model/Comment')

// 文件模块
const fs = require('fs')
// 路径处理
const path = require('path')
// 方法改造
const { promisify } = require('util')
// 删除文件
const unlink = promisify(fs.unlink)

module.exports = async (req, res) => {
	// 获取用户id
	const id = req.params['id']
	// 验证模型
	const schema = Joi.string().required().regex(/^[0-9a-fA-F]{24}$/).error(new Error('用户id不符合格式'))
	// 验证
	const { error } = Joi.validate(id, schema)
	// 数据格式没有通过验证
	if (error) return res.status(400).send({ message: error.message })
	// 通过验证
	// 删除用户
	let post = await Post.findByIdAndDelete(id)
	// 如果缩略图存在
	if (post.thumbnail) {
		// 删除缩略图
		let thumbnailPath = post.thumbnail.split('uploads')[1]
		await unlink(path.join(__dirname, '../', '../', '../', 'public', 'uploads', thumbnailPath))
	}
	if (post.imgList.length > 0) {
		post.imgList.forEach(async item => {
			const imgName = item.split('uploads/')[1]
			await unlink(path.join(__dirname, '../', '../', '../', 'public', 'uploads', imgName))
		})
	}
	await Comment.remove({ post: id })
	// 响应
	res.send(post)
}