const express = require('express');
const router = express.Router();
const Blog = require('../model/blog');
const User = require('../model/user');
const BlogCategory = require('../model/blog_category');

router.get('/get_all_blog', function (req, res) {
    let page = (req.query.page - 1) * 10;
    Blog.count({}, function (err, total) {
        if (err) return res.send({stat: 2100, msg: '服务器错误，错误信息:', err});
        Blog.find({}, '_id title category_id short_content blog_image blog_issuing_time watch_person', {skip: page})
            .populate('category_id').exec(function (errs, data) {
            if (errs) res.send({
                stat: 1001,
                msg: '发生错误，错误信息为:' + errs
            });
            else res.send({stat: 0, data: data, total: total});
        })
    });

})
    .get('/get_blog_detail', function (req, res) {
        let _id = req.query.id;
        Blog.findOne({_id: _id}, 'title short_content watch_person content')
            .populate('category_id').exec(function (err, data) {
            if (err) return res.send({
                stat: 1001,
                msg: '发生错误，错误信息为:' + err
            });
            data.watch_person++;
            data.save(function (err, datas) {
                res.send({stat: 0, data: datas});
            })
        })
    })


module.exports = router;

