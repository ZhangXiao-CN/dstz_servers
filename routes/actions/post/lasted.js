// 用户模块
const { Post } = require('../../../model/Post')

module.exports = async (req, res) => {
	// 查询用户信息
	const limit = req.query.limit ? parseInt(req.query.limit) : 10
	const posts = await Post.find({ state: 1 })
		.select('-content -html -Favorites -likesUser')
		.sort('-createAt')
		.populate('author', 'avatar nickName')
		.populate('category').limit(limit)
	// 响应
	res.send(posts)
}