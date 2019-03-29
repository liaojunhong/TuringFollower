const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogSchema = new Schema({
    user_id: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    category_id: {
        type: mongoose.Schema.ObjectId,
        ref:'BlogCategory'
    },
    title: {
        type: String,
        required: true
    },
    short_content: {
        type: String,
        require: true
    },
    content: {
        type: String,
        require: true
    },
    watch_person: {
        type: Number,
        default: 0
    },
    blog_image: {
        type: String,
        default: '/public/images/default_avatar.jpg'
    },
    blog_issuing_time: {
        type: Date,
        default: Date.now
    }

});


const Blog = mongoose.model('Blog', blogSchema);
module.exports = Blog;