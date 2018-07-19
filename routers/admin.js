var express = require('express')
var router = express.Router()
var User = require('../models/User')
var Category = require('../models/Category')
var Content = require('../models/Content')

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
  分类首页
*/
router.get('/category', function (req, res, next) {
    // res.send('分类管理')
    // 获取请求中的数据
    var page = Number(req.query.page || 1)
    var limit = 10
    var pages = 0
    // 从数据库读取数据 count方法获取数据总条数
    Category.count().then(function (count) {
        // 计算总页数
        pages = Math.ceil(count / limit)
        page = Math.min(page, pages)
        // 取值不能小于1
        // sort 方法 1 升序  -1 降序
        page = Math.max(page, 1)
        var skip = (page - 1) * limit
        Category.find().sort({
            _id: -1
        }).limit(limit).skip(skip).then(function (categories) {
            res.render('admin/category_index', {
                userInfo: req.userInfo,
                data: categories,
                page: page,
                pages: pages,
                limit: limit,
                count: count
            })
        })
    })
})

/* 
  分类管理--增加分类
*/
router.get('/category/add', function (req, res, next) {
    // res.send('分类管理')
    console.log('pass')
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
                message: '分类重复'
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

/* 
  分类管理--分类修改
*/
router.get('/category/edit', function (req, res) {
    // 获取要修改的分类的信息,并用表单的形式展示出来
    var id = req.query.id || ''
    Category.findOne({
        _id: id
    }).then(function (category) {
        if (!category) {
            res.render('admin/error', {
                userInfo: req.userInfo,
                message: '分类信息不存在'
            })
            return Promise.reject()
        } else {
            res.render('admin/category_edit', {
                userInfo: req.userInfo,
                category: category,
                url: '/admin/category'
            })
        }
    })
})

/* 
  分类管理--分类修改
*/
router.post('/category/edit', function (req, res) {
    var id = req.query.id || ''
    var name = req.body.name || ''
    Category.findOne({
        _id: id
    }).then(function (category) {
        if (!category) {
            res.render('admin/error', {
                userInfo: req.userInfo,
                message: '分类信息不存在'
            })
            return Promise.reject()
        } else {
            // 要修改的分类名称是否在数据库中存在
            if (name == category.name) {
                res.render('admin/success', {
                    userInfo: req.userInfo,
                    message: '修改成功',
                    url: '/admin/content'
                })
                return Promise.reject()
            } else {
                return Category.findOne({
                    _id: {
                        $ne: id
                    },
                    name: name
                })
            }
        }
    }).then(function (sameCategory) {
        // 存在相同的数据
        if (sameCategory) {
            res.render('admin/error', {
                userInfo: req.userInfo,
                message: '数据库中存在同名分类'
            })
            return Promise.reject()
        } else {
            // 不存在相同数据,调用update方法
            return Category.update({
                _id: id
            }, {
                name: name
            })
        }
    }).then(function () {
        res.render('admin/success', {
            userInfo: req.userInfo,
            message: '修改成功',
            url: '/admin/content'
        })
    })
})
/* 
  分类管理--分类删除
*/
router.get('/category/delete', function (req, res) {
    var id = req.query.id || ''
    Category.remove({
        _id: id
    }).then(function () {
        res.render('admin/success', {
            userInfo: req.userInfo,
            message: '删除成功',
            url: 'admin/content'
        })
    })
})

/* 
  内容首页
*/
router.get('/content', function (req, res) {
    // res.send('分类管理')
    // 获取请求中的数据
    var page = Number(req.query.page || 1)
    var limit = 10
    var pages = 0
    // 从数据库读取数据 count方法获取数据总条数
    Content.count().then(function (count) {
        // 计算总页数
        pages = Math.ceil(count / limit)
        page = Math.min(page, pages)
        // 取值不能小于1
        // sort 方法 1 升序  -1 降序
        page = Math.max(page, 1)
        var skip = (page - 1) * limit
        Content.find().sort({
            _id: -1
        }).limit(limit).skip(skip).populate(['category', 'user']).sort({
            addTime: -1
        }).then(function (contents) {
            res.render('admin/content_index', {
                userInfo: req.userInfo,
                contents: contents,
                page: page,
                pages: pages,
                limit: limit,
                count: count
            })
        })
    })
})

/* 
  内容首页--增加内容
*/
router.get('/content/add', function (req, res) {
    // 查询现有的分类
    Category.find().sort({
        _id: -1
    }).then(function (categories) {
        res.render('admin/content_add', {
            userInfo: req.userInfo,
            data: categories
        })
    })
})

/* 
  内容保存
*/
router.post('/content/add', function (req, res) {
    if (req.body.category == '') {
        res.render('admin/error', {
            userInfo: req.userInfo,
            message: '内容分类不能为空'
        })
        return
    }
    if (req.body.title == '') {
        res.render('admin/error', {
            userInfo: req.userInfo,
            message: '内容标题不能为空'
        })
        return
    }
    if (req.body.description == '') {
        res.render('admin/error', {
            userInfo: req.userInfo,
            message: '内容简介不能为空'
        })
        return
    }
    if (req.body.content == '') {
        res.render('admin/error', {
            userInfo: req.userInfo,
            message: '内容不能为空'
        })
        return
    }
    // 保存数据到数据库
    new Content({
        category: req.body.category,
        title: req.body.title,
        description: req.body.description,
        content: req.body.content,
        user: req.userInfo._id.toString()
    }).save().then(function (rs) {
        res.render('admin/success', {
            userInfo: req.userInfo,
            message: '保存成功',
            url: '/admin/content'
        })
    })
})

/* 
  内容 -- 修改页面获取
*/
router.get('/content/edit', function (req, res) {
    // 查询现有的分类
    var id = req.query.id || ''
    var categories = []
    Category.find().sort({
        _id: 1
    }).then(function (rs) {
        categories = rs
        return Content.findOne({
            _id: id
        }).populate('category')
    }).then(function (content) {
        if (!content) {
            res.render('admin/error', {
                userInfo: req.userInfo,
                message: '分类信息不存在'
            })
            return Promise.reject()
        } else {
            res.render('admin/content_edit', {
                userInfo: req.userInfo,
                content: content,
                url: '/admin/content',
                data: categories
            })
        }
    })
})
/* 
  内容 -- 修改接口
*/
router.post('/content/edit', function (req, res) {
    console.log(req.body)
    var id = req.query.id || ''
    if (req.body.category == '') {
        res.render('admin/error', {
            userInfo: req.userInfo,
            message: '内容分类不能为空'
        })
        return
    }
    if (req.body.title == '') {
        res.render('admin/error', {
            userInfo: req.userInfo,
            message: '内容标题不能为空'
        })
        return
    }
    if (req.body.description == '') {
        res.render('admin/error', {
            userInfo: req.userInfo,
            message: '内容简介不能为空'
        })
        return
    }
    if (req.body.content == '') {
        res.render('admin/error', {
            userInfo: req.userInfo,
            message: '内容不能为空'
        })
        return
    }
    // 保存数据到数据库
    Content.update({
        _id: id
    }, {
        category: req.body.category,
        title: req.body.title,
        description: req.body.description,
        content: req.body.content
    }).then(function () {
        res.render('admin/success', {
            userInfo: req.userInfo,
            message: '内容保存成功',
            url: '/admin/content'
        })
    })
})


/* 
  内容 -- 删除
*/
router.get('/content/delete', function (req, res) {
    var id = req.query.id || ''
    Content.remove({
        _id: id
    }).then(function () {
        res.render('admin/success', {
            userInfo: req.userInfo,
            message: '删除成功',
            url: '/admin/content'
        })
    })
})

module.exports = router