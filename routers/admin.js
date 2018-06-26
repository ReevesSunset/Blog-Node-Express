var express = require('express')
var router = express.Router()
var User = require('../models/User')
var Category = require('../models/Category')

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


/* 
  分类管理
*/
router.get('/category', function (req, res, next) {
    // res.send('分类管理')
    res.render('admin/category_index', {
        userInfo: req.userInfo
    })
})

/* 
  分类管理--增加分类
*/
router.get('/category/add', function (req, res, next) {
    // res.send('分类管理')
    res.render('admin/category_add', {
        userInfo: req.userInfo
    })
})

/* 
  分类管理--增加分类--分类保存
*/
router.post('/category/add', function (req, res, next) {
    var name = req.body.name || ''
    // 提交的数据不满足要求,就是空的
    if (name == '') {
        res.render('admin/error', {
            userInfo: req.userInfo,
            message: '名称不能为空'
        })
    }
    // 查询数据库中是否有相同的分类名称
    Category.findOne({
        name: name
    }).then(function (error) {
        if (error) {
            res.render('admin/error', {
                userInfo: req.userInfo,
                message: '分类已经存在'
            })
            return Promise.reject()
        } else {
            // 数据库中不存在这个分类
            return new Category({
                name: name
            }).save()
        }
    }).then(function (newCategory) {
        res.render('admin/success', {
            userInfo: req.userInfo,
            message: '保存成功'
        })
    })
})

module.exports = router