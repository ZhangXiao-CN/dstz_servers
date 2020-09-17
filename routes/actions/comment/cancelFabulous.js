// 用户模块
const { Comment } = require('../../../model/Comment')

module.exports = async (req, res) => {
  if (!req.session.userInfo) {
    res.status(400).send('请登录再取消点赞哦!')
    return
  }
  // 获取文章id
  const id = req.params.id
  // 点赞
  try {
    let comment = await Comment.findByIdAndUpdate({ _id: id }, { $pull: { likes: req.session.userInfo._id }, $inc: { likeCount: -1 } }, { new: true })
      .select('likes likeCount').lean() // .lean()将mogoose对象转为普通对象
    // comment = comment.toObject
    comment.likes.forEach(item => {
      if (item == req.session.userInfo._id) {
        comment.islike = true
      } else {
        comment.islike = false
      }
    })
    res.send(comment)
  } catch (error) {
    console.log(error)
    res.status(400).send('操作失败!')
  }
}