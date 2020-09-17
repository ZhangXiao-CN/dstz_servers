// 文章评论路由
const comment = require('express').Router()

// 添加评论
comment.post('/', require('./actions/comment/create'))
// 根据id删除
comment.delete('/:id', require('./actions/comment/findByIdAndDelete'))
// 获取评论列表
comment.get('/:id', require('./actions/comment/find'))
// 获取评论数量
comment.get('/count', require('./actions/comment/count'))
// 获取最新评论
comment.get('/lasted', require('./actions/comment/lasted'))
// 更改评论状态
comment.put('/:id', require('./actions/comment/findByIdAndUpdate'))
// 添加回复
comment.put('/createReply/:id', require('./actions/comment/createReply'))
// 评论点赞
comment.post('/fabulous/:id', require('./actions/comment/fabulous'))
// 评论取消点赞
comment.post('/cancelFabulous/:id', require('./actions/comment/cancelFabulous'))
// 回复点赞
comment.post('/replyFabulous/:id', require('./actions/comment/replyFabulous'))
// 回复取消点赞
comment.post('/cancelReplyFabulous/:id', require('./actions/comment/cancelReplyFabulous'))
// 导出路由
module.exports = comment