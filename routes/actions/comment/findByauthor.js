// 用户模块
const { Comment } = require('../../../model/Comment')
const mongoose = require('mongoose')

module.exports = async (req, res) => {
  // 查询用户信息
  let limit = 5
  if (req.query.limit && parseInt(req.query.limit) > 0) {
    limit = parseInt(req.query.limit)
  }
  const id = req.params.id
  const comment = await Comment.find({ author: id })
    .select('post content createAt')
    .populate('post', 'meta summary title createAt')
    .limit(limit)
  const replies = await Comment.aggregate([
    {
      // 规定返回的字段
      $project: {
        replies: 1,
        post: 1
      }
    },
    {
      // 每个子文档显示为一条数据
      $unwind: '$replies'
    },
    {
      // 过滤 id一定要是mongoose.Types.ObjectId(id)转化
      $match: { "replies.from_uid": mongoose.Types.ObjectId(id) }
    },
    {
      // 聚合查询中,的查询关联表
      $lookup: {
        from: "posts",
        localField: "post",
        foreignField: "_id",
        as: "post"
      }
    }]).limit(limit)

  // 响应
  res.send({ comment, replies })
}