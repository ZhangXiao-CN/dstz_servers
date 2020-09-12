const { User, validateLogin } = require('../../../model/User')
// hash密码
const bcrypt = require('bcryptjs')
// 工具
const _ = require('lodash')

module.exports = async (req, res) => {
	req.session.destroy(err => {
		if (err == null) {
			res.clearCookie('u_id')
			res.send({ message: '退出成功' })
		} else {
			// res.statesend({ message: '退出失败' })
			res.status(400).send({ message: '退出失败' })
		}
	})
}
