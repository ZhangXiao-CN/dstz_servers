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
    // 查询用户信息
    let comment = await Comment.findById(id)
      .populate('replies.from_uid', 'avatar nickName')
      .populate('replies.to_uid', 'avatar nickName')
    for (let i = 0; i < comment.replies.length; i++) {
      if (comment.replies[i]._id == req.fields.replyId) {
        // 手动避免重复添加
        if (comment.replies[i].likes.indexOf(req.session.userInfo._id) == -1) {
          comment.replies[i].likes.push(req.session.userInfo._id)
          comment.replies[i].likeCount += 1
          res.send({
            commentId: comment._id,
            replyId: comment.replies[i]._id,
            likeCount: comment.replies[i].likeCount,
            islike: true
          })
          break // 响应后跳出循环
        }
      }
    }
    await comment.save()
  } catch (error) {
    console.log(error)
    res.status(400).send('操作失败!')
  }

}