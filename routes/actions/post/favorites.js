// 用户模块
const { Post } = require('../../../model/Post')

module.exports = async (req, res) => {
  if (!req.session.userInfo) {
    res.status(400).send('请登录再收藏哦!')
    return
  }
  // 获取文章id
  const id = req.params.id
  try {
    // 点赞
    const post = await Post.update({ _id: id }, { $addToSet: { Favorites: req.session.userInfo._id } })
    // 响应
    res.send({ isFavorites: true })
  } catch (error) {
    res.status(400).send('操作失败!')
  }

}