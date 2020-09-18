// 用户模块
const { Comment } = require('../../../model/Comment')

module.exports = async (req, res) => {
	// 查询用户信息
	let limit = 7
	if (req.query.limit && parseInt(req.query.limit) > 0) {
		limit = parseInt(req.query.limit)
	}
	const comment = await Comment.find({})
		.populate('author', 'avatar nickName')
		.populate('post', 'meta summary title createAt')
		.sort('-createAt').limit(limit)
	// 响应
	res.send(comment)
}