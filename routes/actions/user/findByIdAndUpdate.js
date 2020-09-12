// 验证模块
const Joi = require('joi')
// 用户模块
const { User, validateUser } = require('../../../model/User')
// 工具
const _ = require('lodash')

module.exports = async (req, res) => {
	// 将密码字段抛除
	delete req.fields.password
	req.fields._id = req.params['id']
	// 定义对象验证规则
	const schema = {
		_id: Joi.string().required().regex(/^[0-9a-fA-F]{24}$/).error(new Error('用户id非法')),
		nickName: Joi.string().min(2).max(30).required().error(new Error('昵称最少两位字符')),
		email: Joi.string().regex(/^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/).required().error(new Error('邮箱格式非法')),
		// status: Joi.number().valid(0, 1),
		// role: Joi.string().valid('normal', 'admin')
	}
	// 验证yong
	const { error } = Joi.validate(req.fields, schema, {
		// 允许对象包含被忽略的未知键
		allowUnknown: true
	})
	// 数据格式没有通过验证
	if (error) return res.status(400).send({ message: error.message })
	// 通过验证
	// 更新用户信息
	// new: true 返回修改后的文档 默认值为false 返回原始文档
	// fields: '-password'} 从返回值中抛除密码字段
	let user = await User.findByIdAndUpdate(req.fields._id, { $set: req.fields }, { new: true, fields: '-password' })
	req.session.userInfo = user
	// 响应
	res.send(user)
}