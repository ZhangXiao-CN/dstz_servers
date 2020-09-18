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
    const post = await Post.findByIdAndUpdate(id, { $addToSet: { Favorites: req.session.userInfo._id } })
    // 响应
    if (post) {
      res.send({ isFavorites: true })
    } else {
      res.status(400).send('找不到文章!')
    }
  } catch (error) {
    res.status(400).send('操作失败!')
  }

}