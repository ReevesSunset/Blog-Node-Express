// 定义数据结构
var mongoose = require('mongoose')

module.exports = new mongoose.Schema({
    // 用户名
    username: String,
    // 密码
    password: String
})