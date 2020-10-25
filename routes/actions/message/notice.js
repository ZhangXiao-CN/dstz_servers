const { Notice } = require('../../../model/Notice')

module.exports = async (req, res) => {
  // 创建消息
  const notice = await Notice.create(req.fields)
  // console.log(notice)
  res.send(notice)
}