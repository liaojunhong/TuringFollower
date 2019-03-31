const BlogCategory = require('../model/blog_category');


function getBlogCategory(req, res) {
    var user_id = req.query.user_id;
    BlogCategory.find({ user_id: user_id }, function (err, data) {
        if (err) res.send({ stat: 9999, msg: err });
        else res.send({ stat: 0, data: data })
    })
}


function createBlogCategory(req, res) {
    var user_id = req.body.user_id;
    var name = req.body.name;
    BlogCategory.find({ name: name, user_id: user_id }, function (err, data) {
        if (err) return res.send({ stat: 1000, msg: err })
        else res.send({ stat: 0, msg: '创建分类成功' })
    })
}


function updateBlogCategory(req, res) {
    var category_id = req.body.category_id;
    var name = req.body.name
    BlogCategory.updateOne({ _id: category_id }, function (err, data) {
        if (err) return res.send({ stat: 0, msg: err })
        else res.send({ stat: 0, msg: '更改分类成功' })
    })
}

function deleteBlogCategory(req, res) {
    var category_id = req.query.category_id;
    BlogCategory.findOneAndRemove({ _id: category_id }, function (err, data) {
        if (err) return res.send({ stat: 0, msg: err })
        else res.send({ stat: 0, data: '删除分类成功' })
    })
}

module.exports = {
    getBlogCategory: getBlogCategory,
    createBlogCategory: createBlogCategory,
    updateBlogCategory: updateBlogCategory,
    deleteBlogCategory: deleteBlogCategory,
}