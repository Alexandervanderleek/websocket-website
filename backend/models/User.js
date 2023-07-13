const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    chipsAmount: {
        type: Number,
        default: 1000
    }
})

module.exports = User = mongoose.model('user',userSchema);