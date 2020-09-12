// 用户模块
const { Comment } = require('../../../model/Comment')
// 分页
const pagination = require('mongoose-sex-page')
// 工具
const _ = require('lodash')

module.exports = async (req, res) => {
	// 当前页
	let page = +req.query.page
	// 如果页码没有传递
	if (!page || !_.isNumber(page)) page = 1
	// 查询用户信息
	const posts = await pagination(Comment).page(page).size(10).display(5).find({ post: req.params.id }).populate('author', '-password -attention -createTime -email -fans -gender -role -site -status -status').populate('post', '-content -meta -html').exec()
	// 响应
	res.send(posts)
}