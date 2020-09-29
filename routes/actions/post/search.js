// 用户模块
const { Post } = require('../../../model/Post')

module.exports = async (req, res) => {
	// 获取用户输入的关键字
	const key = req.params.key
	const limit = req.query.limit ? parseInt(req.query.limit) : 10
	// 如果用户输入了搜索关键字
	if (key.trim().length > 0) {
		const regex = new RegExp(escapeRegex(key), 'gi')
		// 根据关键字查询文章
		const posts = await Post.find(
			{
				$or: [
					{ title: regex },
					{ text: regex }
				]
			}
		)
			.select('-content -html -Favorites -likesUser')
			.sort('-updateAt')
			.populate('author', 'avatar nickName')
			.populate('category').limit(limit)
		// 响应
		res.send(posts)
	} else {
		res.status(400).send({ message: '请输入搜索关键字' })
	}

}

// 如果搜索文本中包含 正则表达式的特殊字符, 将其转义
function escapeRegex(text) {
	return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&")
}