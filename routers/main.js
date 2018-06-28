var express = require('express')
var router = express.Router()
var Category = require('../models/Category')

router.get('/', function (req, res) {
    Category.find().then(function(categorise) {
        res.render('main/index', {
            userInfo: req.userInfo,
            categorise: categorise
        })
    })
})

module.exports = router