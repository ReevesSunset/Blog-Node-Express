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
        categories: [],
        count: 0,
        page: Number(req.query.page || 1),
        limit: 3,
        pages: 0
    }
    Category.find().then(function (categories) {
        data.categories = categories
        // 读取总条数
        return Content.count()
    }).then(function (count) {
        data.count = count
        data.pages = Math.ceil(data.count / data.limit)
        data.page = Math.min(data.page, data.pages)
        data.page = Math.max(data.page, 1)
        var skip = (data.page - 1) * data.limit
        return Content.find().limit(data.limit).skip(skip).populate(['category', 'user']).sort({
            addTime: -1
        })
    }).then(function (contents) {
        data.contents = contents
        console.log(data)
        res.render('main/index', data)
    })
})

module.exports = router