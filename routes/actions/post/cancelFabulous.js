// 用户模块
const { Post } = require('../../../model/Post')

module.exports = async (req, res) => {
  if (!req.session.userInfo) {
    res.status(400).send('请登录再取消点赞哦!')
    return
  }
  // 获取文章id
  const id = req.params.id
  // 点赞
  try {
    await Post.update({ _id: id }, { $pull: { likesUser: req.session.userInfo._id } })
    // 查询用户信息
    const post = await Post.findOne({ _id: id }).select('meta')
    // 赞数量-1
    post.meta.likes = post.meta.likes - 1
    // 保存
    await post.save()
    // 响应
    res.send({ islike: false, post: post })
  } catch (error) {
    res.status(400).send('操作失败!')
  }
}