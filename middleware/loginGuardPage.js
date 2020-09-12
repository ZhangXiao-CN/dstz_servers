const express = require('express')
const path = require('path')
module.exports = async (req, res, next) => {
    if (req.url.startsWith('/admin') && req.url != '/admin/login.html') { // 是以admin开头
        if (!req.session.userInfo) {
            app.use(express.static(path.join(__dirname, 'public'), { maxAge: 1 }))   // 未登录跳转登录页
            res.redirect('/admin/login.html')
        } else {                                                          // 已登录放行
            if (req.session.userInfo.role == "admin") {                  // 用户角色是 admin 放行
                next()
            } else if (req.session.userInfo.role == "normal") {         // 用户角色是 normal 跳转 首页
                app.use(express.static(path.join(__dirname, 'public'), { maxAge: 1 }))
                res.redirect('/index.html')
            }
        }
    } else if (req.url == '/admin/login.html') {               // 是以login开头
        if (!req.session.userInfo) {                          // 未登录放行
            next()
        } else {                                             // 已登陆跳转
            if (req.session.userInfo.role == "admin") {     // 已登录根据用户角色跳转相应主页
                app.use(express.static(path.join(__dirname, 'public'), { maxAge: 1 }))
                res.redirect('/admin/index.html')
            } else if (req.session.userInfo.role == "normal") {
                app.use(express.static(path.join(__dirname, 'public'), { maxAge: 1 }))
                res.redirect('/index.html')
            }
        }
    } else {     // 否则(其实就是以home开头,因为此网站只有 admin, login, home 三个主路由)
        next()
    }
}