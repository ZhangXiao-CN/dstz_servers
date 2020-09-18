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
    const post = await Post.findByIdAndUpdate(id, { $pull: { likesUser: req.session.userInfo._id } }, { new: true }).select('meta')
    // 赞数量-1
    if (post) {
      post.meta.likes = post.meta.likes - 1
      // 保存
      await post.save()
      // 响应
      res.send({ islike: false, post: post })
    } else { res.status(400).send('找不到文章!') }
  } catch (error) {
    res.status(400).send('操作失败!')
  }
}