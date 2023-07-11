const mongoose = require('mongoose');

const recordSchema = new mongoose.Schema({
    math: {
        type: Number,
        required: [true, 'Score is required']
    },
    english: {
        type: String,
        required: [true, 'Score is required']
    }
}, {timestamps: true});

const recordModel = mongoose.model('record', recordSchema)
module.exports = recordModel