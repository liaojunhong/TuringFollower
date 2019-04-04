const User = require('../model/user');
const md5 = require('blueimp-md5');
const jwt = require('jsonwebtoken');


function getAlluser(req, res) {
    User.find(function (err, data) {
        if (err) res.send({
            stat: 1001,
            msg: '发生错误，错误信息为:' + err
        });
        else res.send(data);
    })
}

function createUser(req, res) {
    temp_user = req.body;
    temp_user.password = md5(md5(temp_user.password));
    User.findOne({nick_name: temp_user.name}, function (err, data) {
        if(err) return res.send({stat:8888,msg:'服务器错误!~'});
        if(data) return res.send({stat:1000,msg:'该用户名已经存在!'});
        User.create({
            nick_name: temp_user.name,
            password: temp_user.password,
            user_permission: 0
        }, function (err, data) {
            if (err) res.send({stat: 9999, msg: err});
            else res.send({stat: 0, msg: '注册成功!'})
        });
    });
}

function getUserInfo(req, res) {
    var token = req.get("_token");
    var name = jwt.decode(token).name;
    User.findOne({'nick_name': name}, function (err, data) {
        if (err) return res.send({stat: 2000, msg: err});
        else if (data === null) {
            return res.send({stat: 2000, msg: '账号错误!'})
        } else {
            const new_data = {
                name: data.nick_name,
                id: data._id,
                user_avatar: data.user_avatar,
                user_permission: data.user_permission
            };
            return res.send({stat: 0, data: new_data})
        }
    })
}

function loginIn(req, res) {
    var user = req.body;
    User.findOne({'nick_name': user.name, password: md5(md5(user.password))}, function (err, data) {
        if (err) {
            return res.send({stat: 1000, msg: err})
        } else if (data === null) {
            return res.send({stat: 2000, msg: '账号或密码错误!'})
        } else {
            var content = {name: data.nick_name};
            let secretOrPrivateKey = "test";         // 这是加密的key（密钥）
            let token = jwt.sign(content, secretOrPrivateKey, {
                expiresIn: 60 * 10                       // 1分钟过期
            });
            return res.send({token: token, stat: 0, msg: '登陆成功!'})
        }
    });
}


module.exports = {
    getAlluser: getAlluser,
    createUser: createUser,
    loginIn: loginIn,
    getUserInfo: getUserInfo
}

