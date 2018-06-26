var express = require('express')
var router = express.Router()
var User = require('../models/User')

router.use(function (req, res, next) {
    // 如果不是管理员无法进入Admin页面
    if (!req.userInfo.isAdmin) {
        res.send('您还不是管理员')
        return
    }
    next() // 下一步
})

/* 
    管理首页
*/
router.get('/', function (req, res, next) {
    res.render('admin/index', {
        userInfo: req.userInfo
    })
})


/* 
  用户管理
  limit(Number) : 限制获取的数据条数
  skip(2) : 忽略数据的条数
*/
router.get('/user', function (req, res, next) {
    // 获取请求中的数据
    var page = Number(req.query.page || 1)
    var limit = 10
    var pages = 0
    // 从数据库读取数据 count方法获取数据总条数
    User.count().then(function (count) {
        // 计算总页数
        pages = Math.ceil(count / limit)
        page = Math.min(page, pages)
        // 取值不能小于1
        page = Math.max(page, 1)
        var skip = (page - 1) * limit
        User.find().limit(limit).skip(skip).then(function (users) {
            res.render('admin/user_index', {
                userInfo: req.userInfo,
                users: users,
                page: page,
                pages: pages,
                limit: limit,
                count: count
            })
        })
    })

})

module.exports = router