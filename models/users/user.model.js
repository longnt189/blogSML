const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        default: 'http://manuel.midoriparadise.com/public_html/icons/linuxpenguin.png',
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model('users', userSchema);