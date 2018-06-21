var express = require('express')
var router = express.Router()
var User = require('../models/User')
// 统一的返回的数据格式
var responseData
// 
router.use(function (req, res, next) {
    responseData = {
        code: 200,
        message: ''
    }
    next()
})

// 用户注册逻辑
/*
    逻辑
    1. 用户名密码不能为空
    2. 两次输入密码是否一致

    1. 用户是否已经被注册 ( 数据库查询 )
*/
router.post('/user/register', function (req, res, next) {
    console.log(req.body) // 传过来的数据
    var username = req.body.username
    var password = req.body.password
    var repassword = req.body.repassword
    if (username == '') {
        responseData.code = 1
        responseData.message = '用户名不能为空'
        res.json(responseData)
        return
    }
    if (password == '') {
        responseData.code = 2
        responseData.message = '密码不能为空'
        res.json(responseData)
        return
    }
    if (password != repassword) {
        responseData.code = 3
        responseData.message = '密码不一致'
        res.json(responseData)
        return
    }

    // 从数据库查询,用户是否已经被注册
    User.findOne({
        username: username
    }).then(function (userInfo) {
        console.log(userInfo)
        if (userInfo) {
            responseData.code = 4
            responseData.message = '用户名已经被注册了'
            res.json(responseData)
            return
        }
        // 保存用户注册的信息到数据库中
        var user = new User({
            username: username,
            password: password
        })
        return user.save() // 通过操作对象操作 数据库
    }).then(function (newUserInfo) {
        console.log(newUserInfo)
        responseData.message = '注册成功'
        res.json(responseData)
    })
})
/*
    登录
*/
router.post('/user/register', function (req, res, next) {
    console.log(req.body) // 传过来的数据
    var username = req.body.username
    var password = req.body.password
    var repassword = req.body.repassword
    if (username == '') {
        responseData.code = 1
        responseData.message = '用户名不能为空'
        res.json(responseData)
        return
    }
    if (password == '') {
        responseData.code = 2
        responseData.message = '密码不能为空'
        res.json(responseData)
        return
    }

    // 从数据库查询,用户是否已经被注册
    User.findOne({
        username: username
    }).then(function (userInfo) {
        if (userInfo) {
            responseData.code = 4
            responseData.message = '用户名已经被注册了'
            res.json(responseData)
            return
        }
        // 保存用户注册的信息到数据库中
        var user = new User({
            username: username,
            password: password
        })
        return user.save() // 通过操作对象操作 数据库
    }).then(function (newUserInfo) {
        responseData.message = '登录成功'
        res.json(responseData)
    })
})
module.exports = router