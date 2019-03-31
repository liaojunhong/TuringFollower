const jwt = require('jsonwebtoken');
const Blog = require('../model/blog');


function createBlog(req, res) {
    const data = req.body;
    const blog = {
        title: '测试博客2',
        short_content: '短内容2',
        content: '主要内容啊，发动机爱国范德萨干撒范德萨',
        category_id: '5ca061921708b080ed975ccc',
        user_id: '5ca060e474b04a1b3c501989'
    };
    Blog.create(blog, function (err, data) {
        if (err) res.send({stat: 9999, msg: err});
        else res.send({stat: 0, msg: '创建成功!'})
    })


}

function getBlog(req, res) {
    var user_id = req.query.user_id;
    console.log(user_id)
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
        user_id: data.user_id
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


module.exports = {
    createBlog: createBlog,
    getBlog: getBlog,
    updateBlog: updateBlog,
    deleteBlog: deleteBlog
};