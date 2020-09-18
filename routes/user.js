// 用户路由
const user = require('express').Router()


// 查询邮箱是否已被注册
user.get('/email', require('./actions/user/email'))
// 创建用户
user.post('/', require('./actions/user/create'))
// 查询所有用户信息
user.get('/', require('./actions/user/find'))
// 登录用户密码修改
user.put('/password', require('./actions/user/password'))
// 根据id删除用户信息
user.delete('/:id', require('./actions/user/findByIdAndDelete'))
// 根据id修改用户信息
user.put('/:id', require('./actions/user/findByIdAndUpdate'))
// 关注
user.put('/attention/:id', require('./actions/user/attention'))
// 取消关注
user.put('/cancelAttention/:id', require('./actions/user/cancelAttention'))
// 是否关注
user.get('/isAttention/:id', require('./actions/user/isAttention'))
// 根据用户id查询用户信息
user.get('/:id', require('./actions/user/findById'))
// 查询用户关注
user.get('/findAttention/:id', require('./actions/user/findAttention'))
// 查询用户粉丝
user.get('/findFans/:id', require('./actions/user/findFans'))

// 导出路由
module.exports = user
