const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required']
    },
    email: {
        type: String,
        required: [true, 'Password is required']
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    }
}, {timestamps: true});

const userModel = mongoose.model('User', userSchema)
module.exports = userModel