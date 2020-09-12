const { Post } = require('../../../model/Post')

module.exports = async (req, res) => {
  // 查找
  let post = await Post.find({ slide: 2 }).populate('author', '-password').populate('category').select('-content -html')
  // 响应
  res.send(post)
}