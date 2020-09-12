// 用户模块
const { Post } = require('../../../model/Post')

module.exports = async (req, res) => {
	const limit = req.query.size ? req.query.size : 8
	const posts = await Post.find({ state: 1 }).select('-content').limit(limit).sort('-meta.comments')
	// 响应
	res.send(posts)
}