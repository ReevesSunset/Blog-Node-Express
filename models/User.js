// 定义数据结构
var mongoose = require('mongoose')

var usersSchema = require('../schemas/users')

module.exports =  mongoose.model('User', usersSchema)