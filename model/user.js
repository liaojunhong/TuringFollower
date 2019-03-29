const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    nick_name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: [true, '密码为必填']
    },
    register_time: {
        type: Date,
        default: Date.now
    },
    user_permission: {
        type: Number,
        enum: [-1, 0, 1, 2],
        default: 0// -1: 删除 0: 所有权限 1: admin 2 : 用户
    },
    user_avatar: {
        type: String,
        default: '/public/images/default_avatar.jpg'
    },

});




const User = mongoose.model('User', userSchema);
module.exports = User;