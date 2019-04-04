const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogCategorySchema = new Schema({
    name: {
        type: String,
        require: true
    },
    user_id: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required:true
    }
});

const BlogCategory = mongoose.model('BlogCategory', blogCategorySchema);
module.exports = BlogCategory;