'use static';

const mongoose = require('mongoose');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const router = require('./route/router');
const jwt = require('jsonwebtoken');


mongoose.connect('mongodb://localhost/test');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => console.log('connectiong success')
);

app.use(bodyParser.json());
app.use(bodyParser.json({extended: false}));
app.use(function (req, res, next) {
    if (req.url.indexOf('/public') !== -1 || req.url === '/register_page' ||
        req.url === '/user_login'
    ) next();
    else {
        var token = req.get("_token");
        var secretOrPrivateKey = 'test';
        jwt.verify(token, secretOrPrivateKey, (err, decode) => {
            if (err) res.send({stat: 1000, msg: '请登录'});
            else {
                next();
            }
        })
    }
});

app.use("*", function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "content-type");
    res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS");
    if (req.method.toLowerCase() == 'options')
        res.send({stat: 0, msg: '请登录'});  //让options尝试请求快速结束
    else
        next();
});

app.engine('html', require('express-art-template'));
app.use('/public', express.static(path.join(__dirname, './public')));
app.use(router);

app.listen(3000, () => console.log('server is running 127.0.0.1:3000'));


