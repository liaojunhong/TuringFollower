const Blog = require('../model/blog');
const formidable = require('formidable');
const path = require('path');
const fs = require('fs');
const md5 = require('blueimp-md5');

function createBlog(req, res) {
    const data = req.body;
    if (!data.user_id) return res.send({stat: 2000, msg: '当前用户id为必传!'});
    const blog = {
        title: data.title,
        short_content: data.short_content,
        content: data.content,
        category_id: data.category_id,
        user_id: data.user_id,
        blog_image: data.blog_image
    };
    Blog.create(blog, function (err, data) {
        if (err) res.send({stat: 9999, msg: err});
        else res.send({stat: 0, msg: '创建成功!'})
    });
}

function getBlog(req, res) {
    var user_id = req.query.user_id;
    var size = req.query.size || 10;
    var page = req.query.page;
    if (!page) return res.send({stat: 1000, msg: '请输入页码!'});
    Blog.count({user_id: user_id}, function (err, total) {
        if (err) return res.send({stat: 2100, msg: '服务器错误，错误信息:', err});
        Blog.find({user_id: user_id}, '_id title category_id user_id blog_image blog_issuing_time').populate('category_id').limit(parseInt(size)).skip(parseInt(page) - 1).exec(function (err, data) {
            if (err) res.send({stat: 9999, msg: err});
            else res.send({stat: 0, data: data, total: total})
        })
    });
}

function getBlogDetail(req, res) {
    var _id = req.query._id;
    if(!_id) return res.send({stat:1000,msg:'请输入博客文章id!'});
    Blog.findOne({_id:_id}, '_id title category_id short_content content user_id blog_image blog_issuing_time').populate('category_id').exec(function (err, data) {
            if (err) return res.send({stat: 9999, msg: err});
            if (data) return res.send({stat: 0, data: data});
            else  res.send({stat: 2000, msg: '无此篇文章!'});
        })
}

function updateBlog(req, res) {
    const data = req.body;
    const new_data = {
        _id: data.id,
        title: data.title,
        short_content: data.short_content,
        content: data.content,
        blog_category: data.category_id,
        user_id: data.user_id,
        blog_image: data.blog_image
    };
    Blog.updateOne({_id: data.id}, {$set: new_data}, function (err, data) {
        if (err) res.send({stat: 9999, msg: err});
        else res.send({stat: 0, msg: '更新成功!'})
    })
}

function deleteBlog(req, res) {
    const _id = req.body.id;
    Blog.findByIdAndDelete(_id, function (err, data) {
        if (err) res.send({stat: 9999, msg: err});
        else res.send({stat: 0, msg: '删除成功!'})
    })

}

function uploadBlogImg(req, res) {
    var form = new formidable.IncomingForm();
    form.uploadDir = './public/images/';
    form.parse(req, function (err, fields, files) {
        try {
            if (err) return res.send({stat: 3000, msg: '解析失败!'});
            let File = files[''];
            if (files['file']) File = files['file'];
            let newname = File.path + path.parse(File.name).ext;
            fs.rename(File.path, newname, function (errs) {
                if (errs) res.send({stat: 1999, msg: '服务器错误!' + errs});
                else res.send({stat: 0, msg: 'ok!', image: newname})
            });
        } catch (err) {
            return res.send({stat: 9999, msg: '服务器错误,', err})
        }
    })
}


module.exports = {
    createBlog: createBlog,
    getBlog: getBlog,
    updateBlog: updateBlog,
    deleteBlog: deleteBlog,
    uploadBlogImg: uploadBlogImg,
    getBlogDetail: getBlogDetail
};