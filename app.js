const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
// session模块
var session = require('express-session')
// 处理文件上传
const formidableMiddleware = require('express-formidable')
// 跨域模块
// const cors = require('cors')
const app = express()

app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:8080') //当允许携带cookies此处的白名单不能写’*’
  // res.header('Access-Control-Allow-Origin', 'http://192.168.1.112') //当允许携带cookies此处的白名单不能写’*’
  res.header('Access-Control-Allow-Headers', 'content-type,Content-Length, Authorization,Origin,Accept,X-Requested-With') //允许的请求头
  res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT, DELETE') //允许的请求方法
  res.header('Access-Control-Allow-Credentials', true)  //允许携带cookies
  next()
})

// session配置
// 在登陆拦截中需要使用到 session 所以session 模块需要放在登陆拦截的上面
app.use(require('./middleware/sessionConfig'))
// 登陆拦截  注意路由的顺序很重要,要拦截静态资源就要把拦截路由放在 静态资源路由上面
app.use('/', require('./middleware/loginGuardPage'))
// app.use('/', require('./middleware/loginGuardReq'))
// 开放静态资源
app.use(express.static(path.join(__dirname, 'public'), { maxAge: 1 }))
// 处理post参数
app.use(formidableMiddleware({
  // 文件上传目录
  uploadDir: path.join(__dirname, 'public', 'uploads'),
  // 最大上传文件为2M
  // maxFileSize: 2 * 1024 * 1024,
  // 保留文件扩展名
  keepExtensions: true
}))

mongoose.connect('mongodb://localhost:27017/alibaixiu', { useNewUrlParser: true, useCreateIndex: true })
  .then(() => console.log('数据库连接成功'))
  .catch(() => console.log('数据库连接失败'))
require('./routes')(app)
app.listen(3000, () => console.log('服务器启动成功'))
