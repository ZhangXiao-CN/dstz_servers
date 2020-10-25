const { Notice } = require('../../../model/Notice')

module.exports = async (req, res) => {
  if (req.session.userInfo) {
    const limit = req.query.limit ? parseInt(req.query.limit) : 10

    const notices = await Notice.find({ toUser: req.session.userInfo._id })
      .sort('-createAt')
      .populate('fromUser', 'avatar nickName')
      .populate('fromArticle', 'title')
      .populate('fromComment', 'content')
      .limit(limit)
    res.send(notices)
  } else {
    res.status(400).send({ message: '请登陆' })
  }
}