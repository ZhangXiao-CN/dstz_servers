const { Post } = require('../../../model/Post')

module.exports = async (req, res) => {
  const id = req.params.id
  // 查询用户信息
  const limit = req.query.limit ? parseInt(req.query.limit) : 5
  const posts = await Post.find({ Favorites: id })
    .select('title meta summary thumbnail categoryChilren category updateAt createAt tag')
    .limit(limit)
  res.send(posts)
}