// 分类模型
const { Category } = require('../../../model/Category')
// 工具
const _ = require('lodash')

module.exports = async (req, res) => {
  // 数据格式校验
  if (!req.fields.child) {
    res.status(400).send({ message: '分类有误' })
    return
  }
  if (typeof req.fields.child !== 'string') {
    res.status(400).send({ message: '分类有误' })
    return
  }
  if (req.fields.child.trim().length === 0) {
    res.status(400).send({ message: '分类有误' })
    return
  }
  // 查询分类
  let category = await Category.findOne({ children: { $elemMatch: { childrenTitle: req.fields.child } } })
  // 分类已存在
  if (category) return res.status(400).send({ message: '分类已经存在' })

  // 创建分类对象
  const newCategory = await Category.updateOne({ _id: req.fields.parentID }, { $push: { children: { childrenTitle: req.fields.child } } })
  // 保存分类
  // 响应
  res.send(category)
}
