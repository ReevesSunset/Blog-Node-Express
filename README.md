# Blog-Node-Express

## 依赖

1.  body-parser 获取客户端提交过来的数据
2.  cookies 处理 cookies,存储在客户端
3.  express 基础框架
4.  mongoose 操作数据库
5.  swig 前端模板引擎
6.  mongodb 数据库

## 数据库

> 使用 mongoose 链接数据库(app.js)

```
    mongoose.connect('mongodb://localhost:27017/blog', function (err) {
    if (err) {
        console.log('---- Database link failed ----')
    } else {
        console.log('---- Database link succeeded  ----')
        // 连接数据库成功后再监听http请求,防止发生错误s
        app.listen(8081)
    }
})
```

## 运行项目

# 先把项目克隆到本地

$ git clone https://github.com/ReevesSunset/Blog-Node-Express.git

# 进入后端项目文件夹

$ cd Blog-Node-Express

# 安装后端所需依赖

$ npm install

# 运行后端项目

$ npm run dev

> 本地地址: http://localhost:8081/
