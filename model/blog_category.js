const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogCategorySchema = new Schema({
    name: {
        type: String,
        require: true
    },
    user_id: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    }
});

const BlogCategory = mongoose.model('BlogCategory', blogCategorySchema);
module.exports = BlogCategory;