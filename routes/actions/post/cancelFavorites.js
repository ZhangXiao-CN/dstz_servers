// 用户模块
const { Post } = require('../../../model/Post')

module.exports = async (req, res) => {
  if (!req.session.userInfo) {
    res.status(400).send('请登录再取消收藏哦!')
    return
  }
  // 获取文章id
  const id = req.params.id
  // 点赞
  try {
    const a = await Post.update({ _id: id }, { $pull: { Favorites: req.session.userInfo._id } })
    // 响应
    res.send({ isFavorites: false })
  } catch (err) {
    res.status(400).send('操作失败!')
  }
}