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
    let comment = await Comment.findById(id)
      .select('replies') // .lean()将mogoose对象转为普通对象
    // 查询用户信息
    // 响应
    // comment = comment.toJSON()
    for (let i = 0; i < comment.replies.length; i++) {
      if (comment.replies[i]._id == req.fields.replyId) {
        comment.replies[i].likes.pull(req.session.userInfo._id)
        comment.replies[i].likeCount -= 1
        res.send({
          commentId: comment._id,
          replyId: comment.replies[i]._id,
          likeCount: comment.replies[i].likeCount,
          islike: false
        })
        break
      }
    }
    comment.save()
  } catch (error) {
    console.log(error)
    res.status(400).send('操作失败!')
  }

}