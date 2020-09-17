// 用户模块
const { Comment } = require('../../../model/Comment')

module.exports = async (req, res) => {
  if (!req.session.userInfo) {
    res.status(400).send('请登录再点赞哦!')
    return
  }
  // 获取文章id
  const id = req.params.id
  try {
    // 点赞
    let comment = await Comment.findByIdAndUpdate(id, { $addToSet: { likes: req.session.userInfo._id }, $inc: { likeCount: 1 } }, { new: true })
      .select('likes likeCount').lean() // .lean()将mogoose对象转为普通对象
    // 查询用户信息
    // 响应
    // comment = comment.toJSON()
    comment.likes.forEach(item => {
      if (item == req.session.userInfo._id) {
        comment.islike = true
      } else {
        comment.islike = false
      }
    })
    delete comment.likes
    res.send(comment)
  } catch (error) {
    console.log(error)
    res.status(400).send('操作失败!')
  }

}