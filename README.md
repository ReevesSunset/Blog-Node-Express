# Blog-Node-Express

> 已实现(可以学到):    
1.  用户的登录/注册
2.  blog分类/文章的增加删除修改
3.  使用mongoose操作mongodb数据库
4.  待更新

## 依赖

1.  body-parser 获取客户端提交过来的数据
2.  cookies 处理 cookies,存储在客户端
3.  express 基础框架
4.  mongoose 操作数据库
5.  swig 前端模板引擎
6.  mongodb 数据库(自行搜索安装)

## 数据库

> 使用 mongoose 连接数据库, 命令启动数据库 ./mongod --dbpath /blog-node-express/db (--dbpath后为本地数据库数据存放位置,此项目就是db文件夹)

```
    // 加载数据库模块
    var mongoose = require('mongoose')
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
```

## 运行项目(前提安装mongodb)

# 先把项目克隆到本地

git clone https://github.com/ReevesSunset/Blog-Node-Express.git

# 进入后端项目文件夹

cd Blog-Node-Express

# 安装后端所需依赖

npm install

# 运行项目

node app.js

> 本地地址: http://localhost:8081/
