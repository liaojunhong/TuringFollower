const Blog = require('../model/blog');
const formidable = require('formidable');
const path = require('path');
const fs = require('fs');
const md5 = require('blueimp-md5');

function createBlog(req, res) {
    const data = req.body;
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
    })


}

function getBlog(req, res) {
    var user_id = req.query.user_id;
    Blog.find({user_id: user_id}, function (err, data) {
        if (err) res.send({stat: 9999, msg: err});
        else res.send({stat: 0, data: data})
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
    Blog.findOneAndRemove({_id: _id}, function (err, data) {
        if (err) res.send({stat: 9999, msg: err});
        else res.send({stat: 0, msg: '删除成功!'})
    })

}

function uploadBlogImg(req, res) {
    var form = new formidable.IncomingForm();
    form.uploadDir = './public/images/';
    form.parse(req, function (err, fields, files) {
        //fields:{name:value}文本域；files：关于你所上传的这个文件的详细信息
        if (err) return res.send({stat: 3000, msg: '解析失败!'});
        console.log(fields);
        console.log(files);
        let oldpath = files.file.path;
        let newpath = md5(oldpath) + path.parse(files.file.name).ext;
        fs.rename(oldpath, newpath, function (err) {
            if (err) res.send({stat: 1999, msg: '服务器错误!'});
            else res.send({stat: 0, msg: 'ok!', image: newpath})
        });
    })
}


module.exports = {
    createBlog: createBlog,
    getBlog: getBlog,
    updateBlog: updateBlog,
    deleteBlog: deleteBlog,
    uploadBlogImg: uploadBlogImg
};