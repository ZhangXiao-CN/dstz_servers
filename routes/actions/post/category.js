// 用户模块
const { Post } = require('../../../model/Post')

module.exports = async (req, res) => {
	// 获取分类id
	const limit = req.query.limit ? parseInt(req.query.limit) : 10
	const categoryID = req.query.categoryID
	const categoryChilren = req.query.categoryChilren
	// 查询用户信息
	let posts = ''
	if (categoryChilren) {
		posts = await Post.find({ categoryChilren: categoryChilren })
			.select('-content -html -Favorites -likesUser')
			.sort('-updateAt')
			.populate('author', 'avatar nickName')
			.populate('category').limit(limit)
	} else if (categoryID) {
		posts = await Post.find({ category: categoryID })
			.select('-content -html -Favorites -likesUser')
			.sort('-updateAt')
			.populate('author', 'avatar nickName')
			.populate('category').limit(limit)
	}

	// 响应
	res.send(posts)
}