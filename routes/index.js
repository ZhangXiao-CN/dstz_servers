// 路由集合
module.exports = app => {
	// 用户
	app.use('/api/users', require('./user'))
	// 分类
	app.use('/api/categories', require('./category'))
	// 文章
	app.use('/api/posts', require('./post'))
	// 评论
	app.use('/api/comments', require('./comment'))
	// 轮播图
	app.use('/api/slides', require('./slide'))
	app.use('/api/messages', require('./message'))

	// 其他
	// 用户登录
	app.post('/api/login', require('./actions/other/login'))
	// 用户退出
	app.post('/api/logout', require('./actions/other/logout'))
	// 判断用户是否登录
	app.get('/api/login/status', require('./actions/other/loginStatus'))
	// 图片文件上传
	app.post('/api/upload', require('./actions/other/upload'))
	app.delete('/api/deletefile/:fileName', require('./actions/other/deletefile'))
}