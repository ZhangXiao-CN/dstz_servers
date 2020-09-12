const session = require('express-session')
const MongoStore = require('connect-mongo')(session)  // 此处返回一个函数,调用并传入session模块

module.exports = session({
  name: 'u_id',                    // 返回给客户端cookie的key
  secret: 'secret key',            // 参与加密的字符串(又称签名)
  resave: true,                    // 是否在每次请求时,强制重新保存session,即是他们没有变化
  saveUninitialized: false,        // 是否在存储内容之前创建session会话
  cookie: {
    secure: false,               // 为true时只能在 https请求中传递 cookie
    httpOnly: true,              // 开启后客户端无法通过js操作cookie(防止XSS攻击)
    maxAge: 7 * 24 * 60 * 60 * 1000  // cookie过期时间(七天), 单位毫秒
  },
  store: new MongoStore({
    url: 'mongodb://localhost/alibaixiu', // 将session存储到mongodb中
    touchAfter: 24 * 60 * 60        // 修改数据库中session的频率(一天), 单位秒
  })
})
