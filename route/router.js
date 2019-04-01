const express = require('express');
const router = express.Router();
const user = require('../controller/users');
const blog = require('../controller/blogs');
const blog_category = require('../controller/blog_categorys');

router.get('/', function (req, res) {
        res.render('login.html');
    })
    .get('/index', user.getAlluser)
    .get('/get_userinfo', user.getUserInfo)
    .get('/register_page', function (req, res) {
        res.render('register_page.html');
    })
    .post('/user_login', user.loginIn)
    .post('/user_register', user.createUser);


router.get('/get_blog', blog.getBlog)
    .post('/create_blog', blog.createBlog)
    .post('/update_blog', blog.updateBlog)
    .post('/delete_blog', blog.deleteBlog)
    .post('/upload_blog_image', blog.uploadBlogImg);


router.get('/get_blog_category', blog_category.getBlogCategory)
    .post('/create_blog_category', blog_category.createBlogCategory)
    .post('/update_blog_category', blog_category.updateBlogCategory)
    .post('/delete_blog_category', blog_category.deleteBlogCategory);

module.exports = router;