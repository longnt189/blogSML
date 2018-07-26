const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const blogSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    content: {
        type: String,
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    category: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('blogs', blogSchema);