// 定义数据结构
var mongoose = require('mongoose')

var contentsSchema = require('../schemas/contents')

module.exports =  mongoose.model('Content', contentsSchema)