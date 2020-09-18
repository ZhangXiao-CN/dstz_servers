// 用户模块
const { User } = require('../../../model/User')

module.exports = async (req, res) => {
  if (!req.session.userInfo) {
    return res.send({ isAttention: false })
  }
  const id = req.params.id
  try {
    const users = await User.findOne({ _id: id, fans: req.session.userInfo._id })
    if (users) {
      res.send({ isAttention: true })
    } else {
      res.send({ isAttention: false })
    }
  } catch (error) {
    res.status(400).send('操作失败!')
  }
}