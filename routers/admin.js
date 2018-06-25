var express = require('express')
var router = express.Router()

router.use(function(req, res, next){
    if (!req.userInfo.isAdmin) {
        res.send('您还不是管理员')
        return
    }
    next()
})

// 管理首页
router.get('/', function (req, res, next) {
    res.render('admin/index', {
        userInfo: req.userInfo
    })
})

module.exports = router