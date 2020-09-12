const { User, validateEmail } = require('../../../model/User')

module.exports = async (req, res) => {
    // 数据格式校验
    const { error } = validateEmail({ email: req.query.email })
    // 格式不符合要求
    if (error) return res.status(400).send({ message: error.message })
    // 格式符合要求 继续向下执行
    // 查询用户
    let user = await User.findOne({ email: req.query.email })
    // 用户已存在
    if (user) return res.status(400).send({ message: '邮箱已经被注册', email: user.email })
    // 用户不存在 可以正常执行注册流程
    // 响应
    res.send('该邮箱可用')
}