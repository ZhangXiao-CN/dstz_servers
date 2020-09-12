const { Post } = require('../../../model/Post')

module.exports = async (req, res) => {
  const id = req.params.id
  // 查找
  await Post.update({ id: id }, { slide: 2 })
  let post = await Post.find({ slide: 2 }).populate('author', '-password').populate('category').select('-content -html')
  // 响应
  res.send(post)
}