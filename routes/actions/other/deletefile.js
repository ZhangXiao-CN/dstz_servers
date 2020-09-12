const fs = require('fs')
// 路径处理
const path = require('path')
// 方法改造
const { promisify } = require('util')
// 删除文件
const unlink = promisify(fs.unlink)

module.exports = async (req, res) => {
  const filName = req.params['fileName']
  console.log(filName)
  if (filName) {
    if (filName.indexOf('-') != -1) {
      // 批量删除
      const filNameList = filName.split('-')
      for (const item of filNameList) {
        await unlink(path.join(__dirname, '../', '../', '../', 'public', 'uploads', item))
      }
      res.send({ message: '删除文件成功' })
    } else {
      // 单个删除
      try {
        await unlink(path.join(__dirname, '../', '../', '../', 'public', 'uploads', filName))
        res.send({ message: '删除文件成功' })
      } catch (err) {
        res.send({ message: '删除失败' })
      }
    }
  } else {
    res.send({ message: '找不到要删除的文件' })
  }
}
