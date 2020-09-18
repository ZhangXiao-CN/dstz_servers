// 评论模型
const { Comment } = require('../../../model/Comment')
const { Post } = require('../../../model/Post')

module.exports = async (req, res) => {
  if (req.session.userInfo) {
    // 存储回复信息
    let comment = await Comment.findByIdAndUpdate(req.params.id, {
      $push: {
        replies: {
          from_uid: req.session.userInfo._id,
          to_uid: req.fields.to_uid,
          content: req.fields.content,
        }
      }
    }, { new: true })
      .populate('author', 'avatar nickName')
      .populate('post', '-content -meta -html -likesUser -summary -thumbnail -Favorites')
      .populate('replies.from_uid', 'avatar nickName')
      .populate('replies.to_uid', 'avatar nickName')
      .select('replies').lean().exec()
    // 找到被评论的文章
    let post = await Post.findOne({ _id: req.fields.postId }).select('meta')
    // 修改评论数量
    post.meta.comments = post.meta.comments + 1
    // 保存文章数据
    await post.save()
    comment.replies.forEach(item => {
      item.likes.forEach(replyLike => {
        if (replyLike == req.session.userInfo._id) {
          item.islike = true
        }
      })
      item.likes = ''
    })
    res.send({ comment, post })
  } else {
    res.status(400).send({ message: '请登录' })
  }
}