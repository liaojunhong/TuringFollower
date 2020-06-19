'use static';

const mongoose = require('mongoose');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const router = require('./route/routes');

mongoose.connect('mongodb://localhost/test');
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => console.log('connectiong success')
);

app.use(bodyParser.json());
app.use(bodyParser.json({extended: false}));

app.use("*", function (req, res, next) {  //跨域处理
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "content-type");
    res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS");
    console.log(req.method);
    if (req.method.toLowerCase() == 'options')
        return res.send({stat: 0, msg: '请登录'});  //让options尝试请求快速结束
    else
        next();
});

app.use('/public', express.static(path.join(__dirname, './public')));

app.use(router);

app.listen(80, () => console.log('server is running 127.0.0.1'));
