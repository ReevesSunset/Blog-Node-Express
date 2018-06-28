// 定义数据结构
var mongoose = require('mongoose')

//内容管理的表结构    
module.exports = new mongoose.Schema({
    // 关联字段-内容分类id
    category: {
        // 类型
        type: mongoose.Schema.Types.ObjectId,
        // 引用
        ref: 'Content'
    },
    title: String,
    content: String,
    description: String
})