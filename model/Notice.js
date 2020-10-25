// 数据库操作
const mongoose = require('mongoose')
// 模型规则类
const { Schema } = mongoose

// 文章模型规则
const NoticeSchema = new Schema({
  // 状态
  state: {
    type: Number,
    // 0 未读 1 已读
    required: true
  },
  // 创建时间
  createAt: {
    type: Date,
    default: Date.now
  },
  // 来自用户
  fromUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  // 通知用户
  toUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  massageType: {
    type: Number,
    // 0 点赞 1 评论 2 回复 3 收藏 4 关注 5 系统通知
    required: true
  },
  // 具体消息
  messageText: {
    type: String,
    required: true
  },
  // 来自文章
  fromArticle: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
  },
  // 来自评论
  fromComment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment',
  },
  // 来自回复
  fromReplyText: {
    type: String,
    default: null
  },
  // 回复
  toReplyText: {
    type: String,
    default: null
  }
}, { versionKey: false })

const Notice = mongoose.model('Notice', NoticeSchema)

// 导出模块成员
module.exports = {
  Notice
}