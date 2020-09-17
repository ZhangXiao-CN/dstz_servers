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
    const post = await Post.findByIdAndUpdate({ _id: id }, { $pull: { likesUser: req.session.userInfo._id } }, { new: true })
    // 赞数量-1
    post.meta.likes = post.meta.likes - 1
    // 保存
    await post.save()
    let islike = false
    post.likesUser.forEach(item => {
      if (item == req.session.userInfo._id) {
        islike = true
      } else {
        islike = false
      }
    })
    // 响应
    res.send({ islike: islike, post: post })
  } catch (error) {
    console.log(error)
    res.status(400).send('操作失败!')
  }
}