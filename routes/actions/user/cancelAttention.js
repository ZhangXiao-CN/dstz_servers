// 用户模块
const { User } = require('../../../model/User')

module.exports = async (req, res) => {
  if (!req.session.userInfo) {
    return res.status(400).send('登录后才能取消关注哦')
  }
  const id = req.params.id
  if (id == req.session.userInfo._id) {
    return res.status(400).send('自己不能关注自己')
  }
  try {
    const users = await User.findByIdAndUpdate(id, { $pull: { fans: req.session.userInfo._id } })
    if (users) {
      res.send({ isAttention: false })
    } else {
      res.status(400).send('找不到该用户!')
    }
  } catch (error) {
    res.status(400).send('操作失败!')
  }
}