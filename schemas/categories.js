// 定义数据结构
var mongoose = require('mongoose')

// 分类的表结构
module.exports = new mongoose.Schema({
    username: String,
    // 密码
    name: String
})