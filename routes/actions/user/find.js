// 用户模块
const { User } = require('../../../model/User')
const pagination = require('mongoose-sex-page')
// 工具

module.exports = async (req, res) => {
	if (!req.session.userInfo) {
		return res.status(400).send('没有登录')
	} else if (req.session.userInfo.role != 'admin') {
		return res.status(400).send('没有权限')
	}
	// 当前页
	let page = req.query.page
	let size = req.query.size
	// 如果页码没有传递
	if (!page) page = 1
	// 如果size没有传递
	// 将每页显示的数据保存在session中, 以便刷新时,保持一致
	if (!size) {
		size = req.session.defaultSize ? req.session.defaultSize : 3
	} else {
		req.session.defaultSize = size
	}
	// 查询用户信息  -0 隐式转为number类型
	const users = await pagination(User).page(page - 0).size(size - 0).display(5).find().select('-password').sort('-createTime').exec()
	// 响应
	res.send(users)
}