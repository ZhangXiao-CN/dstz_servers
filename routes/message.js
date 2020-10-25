const message = require('express').Router()
// 添加通知
message.post('/notice', require('./actions/message/notice'))
// 获取通知
message.get('/notice', require('./actions/message/findByUser'))
// 获取通知状态
message.get('/notice/state', require('./actions/message/state'))
// 修改状态
message.put('/notice:id', require('./actions/message/findByUser'))


module.exports = message