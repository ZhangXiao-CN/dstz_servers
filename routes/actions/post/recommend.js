// 用户模块
const { Post } = require('../../../model/Post')

module.exports = async (req, res) => {
	let limit = 7
	if (req.query.limit && parseInt(req.query.limit) > 0) {
		limit = parseInt(req.query.limit)
	}
	const posts = await Post.find({ state: 1 }).populate('category').select('title summary createAt categoryChilren category updateAt').limit(limit).sort('-meta.views')
	// 响应
	res.send(posts)
}