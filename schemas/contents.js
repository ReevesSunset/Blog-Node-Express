// 定义数据结构
var mongoose = require('mongoose')

//内容管理的表结构    
module.exports = new mongoose.Schema({
    // 关联字段-内容分类id
    category: {
        // 类型
        type: mongoose.Schema.Types.ObjectId,
        // 引用
        ref: 'Category'
    },
    title: String,
    // 用户
    user: {
        type: mongoose.Schema.Types.ObjectId,
        // 引用
        ref: 'User'
    },
    // 添加时间
    addTime: {
        type: Date,
        default: new Date()
    },
    // 阅读量
    views: {
        type: Number,
        default: 0
    },
    content: {
        type: String,
        default: ''
    },
    description: {
        type: String,
        default: ''
    }
})