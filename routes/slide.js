// 用户路由
const slide = require('express').Router();

// 添加轮播
slide.post('/:id', require('./actions/slide/create'));
// 添加置顶
slide.post('/createFix/:id', require('./actions/slide/createFix'));
// 获取轮播
slide.get('/', require('./actions/slide/find'))
// 获取置顶
slide.get('/fix', require('./actions/slide/findfix'))
// 取消轮播或置顶
slide.get('/cancel/:id', require('./actions/slide/cancel'))

// 导出路由
module.exports = slide;