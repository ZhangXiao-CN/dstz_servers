// 用户模块
const { Comment } = require('../../../model/Comment')

module.exports = async (req, res) => {
	// 查询用户信息
	const comment = await Comment.find({})
		.populate('author', 'avatar nickName')
		.populate('post', 'meta summary title createAt')
		.sort('-createAt').limit(7)
	// 响应
	res.send(comment)
}