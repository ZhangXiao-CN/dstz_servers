const { Notice } = require('../../../model/Notice')

module.exports = async (req, res) => {
  if (req.session.userInfo) {
    const notices = await Notice.find({ toUser: req.session.userInfo._id })
    if (notices.length > 0) {
      res.send(true)
    } else {
      res.send(false)
    }
  } else {
    res.status(400).send({ message: '请登陆' })
  }
}