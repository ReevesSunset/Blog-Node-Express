// 应用程序的启动入口文件
var express = require('express')
var app = express()
// app.get('/style.css', function(req, res, next){
//     res.setHeader('content-type', 'text/css') // 处理器他类型文件
//     // 默认发送时html,正确解析
//     res.send('body {background: red;}')
// })
// 后端处理前端静态文件,设置静态文件托管,当用户访问的url以/publie开始,则返回相应的文件既可
app.use('/public', express.static(__dirname + '/public'))
// 模版处理模块
var swig = require('swig')
// 加载数据库模块
var mongoose = require('mongoose')
// 加载bodyParser模块处理post提交过来的数据
var bodyParser = require('body-parser')
// 加载cookie 模块,记录信息(用户登录状态等)
var Cookies = require('cookies')

// 配置应用模板,定义模板引擎
// 第一个参数: 模板引擎名称,同事也是模板文件后缀, 第二个参数表示用于解析处理模板内容的方法
app.engine('html', swig.renderFile)
// 设置模板文件存放的目录,第一个参数必须是views,第二个参数是目录
app.set('views', './views')
// 注册这个模板引擎,第一个参数固定,第二个参数和 app.engine 第一个参数对应
app.set('view engine', 'html')
// 开发时一般取消模板缓存
swig.setDefaults({
    cache: false
})
// bodyParser 设置,设置后就可以使用 req.body 获取post提交的数据
app.use(bodyParser.urlencoded({
    extended: true
}))
// 设置cookies
app.use(function (req, res, next) {
    req.cookies = new Cookies(req, res)

    // 解析登录用户的cookie信息
    req.userInfo = {}
    if (req.cookies.get('userInfo')) {
        try {
            req.userInfo = JSON.parse(req.cookies.get('userInfo'))
        } catch (e) {}
    }
    console.log(req.cookies.get('userInfo'))
    next()
})

/* 
    根据功能的不同,用app.use进行模块区分.
*/
app.use('/admin', require('./routers/admin'))
app.use('/api', require('./routers/api'))
app.use('/', require('./routers/main'))

// 连接数据库
mongoose.connect('mongodb://localhost:27017/blog', function (err) {
    if (err) {
        console.log('---- Database link failed ----')
    } else {
        console.log('---- Database link succeeded  ----')
        // 连接数据库成功后再监听http请求,防止发生错误
        app.listen(8081)
    }
})