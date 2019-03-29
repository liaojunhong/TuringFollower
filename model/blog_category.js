const mongoose = require('mongoose');
const Schema = mongoose.schema;

const blogCategorySchema = new Schema({
    name: {
        type: String,
        require: true
    }
});

const BlogCategory = mongoose.model('User', blogCategorySchema);
module.exports = BlogCategory;