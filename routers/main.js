var express = require('express')
var router = express.Router()
var Category = require('../models/Category')
var Content = require('../models/Content')


/*
    首页
*/
router.get('/', function (req, res) {
    var data = {
        userInfo: req.userInfo,
        category: req.query.category, // 当前是哪个分类
        categories: [],
        count: 0,
        page: Number(req.query.page || 1),
        limit: 3,
        pages: 0
    }
    // 首页选择展示项
    var where = {}
    if (data.category) {
        where.category = data.category
    }
    Category.find().then(function (categories) {
        data.categories = categories
        // 读取总条数
        return Content.where(where).count()
    }).then(function (count) {
        data.count = count
        data.pages = Math.ceil(data.count / data.limit)
        data.page = Math.min(data.page, data.pages)
        data.page = Math.max(data.page, 1)
        var skip = (data.page - 1) * data.limit
        return Content.where(where).find().limit(data.limit).skip(skip).populate(['category', 'user']).sort({
            addTime: -1
        })
    }).then(function (contents) {
        data.contents = contents
        console.log(data)
        res.render('main/index', data)
    })
})

module.exports = router