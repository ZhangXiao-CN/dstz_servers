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
    const posts = await Post.findByIdAndUpdate({ _id: id }, { $pull: { Favorites: req.session.userInfo._id } }, { new: true })
    // 响应
    let isFavorites = false
    posts.Favorites.forEach(item => {
      if (item == req.session.userInfo._id) {
        isFavorites = true
      } else {
        isFavorites = false
      }
    })
    res.send(isFavorites)
  } catch (err) {
    console.log(err)
    res.status(400).send('操作失败!')
  }
}