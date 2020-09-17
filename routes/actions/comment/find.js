// 用户模块
const { Comment } = require('../../../model/Comment')
// 分页
const pagination = require('mongoose-sex-page')
// 工具
const _ = require('lodash')
const { post } = require('../../comment')

module.exports = async (req, res) => {
	// 当前页
	let page = +req.query.page
	// 如果页码没有传递
	if (!page || !_.isNumber(page)) page = 1
	// 查询用户信息
	let posts = await pagination(Comment).page(page).size(10).display(5).find({ post: req.params.id })
		.populate('author', 'avatar nickName')
		.populate('post', '-content -meta -html -likesUser -summary -thumbnail -Favorites')
		.populate('replies.from_uid', 'avatar nickName')
		.populate('replies.to_uid', 'avatar nickName').exec()
	// 将所有的mogoose对象转为普通对象
	// 此处使用forEach 无法将mogoose对象转为普通对象
	for (let i = 0; i < posts.records.length; i++) {
		posts.records[i] = posts.records[i].toObject()
	}

	posts.records.forEach(item => {
		if (req.session.userInfo) {
			item.likes.forEach(commentLike => {
				if (commentLike == req.session.userInfo._id) {
					item.islike = true
				}
			})
			item.replies.forEach(reply => {
				reply.likes.forEach(replyLike => {
					if (replyLike == req.session.userInfo._id) {
						reply.islike = true
					}
				})
				reply.likes = ''
			})
		}
		item.likes = ''
	})
	res.send(posts)
}