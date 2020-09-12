// 用户模块
const { Post } = require('../../../model/Post')

module.exports = async (req, res) => {
	if (!req.session.userInfo) {
		res.status(400).send('请登录再点赞哦!')
		return
	}
	// 获取文章id
	const id = req.params.id
	try {
		// 点赞
		await Post.update({ _id: id }, { $addToSet: { likesUser: req.session.userInfo._id } })
		// 查询用户信息
		const post = await Post.findOne({ likesUser: req.session.userInfo._id }).select('meta')
		// 赞数量+1
		post.meta.likes = post.meta.likes + 1
		// 保存
		await post.save()
		// 响应
		res.send({ islike: true, post: post })
	} catch (error) {
		res.status(400).send('操作失败!')
	}

}