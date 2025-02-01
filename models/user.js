const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email:{
        required:true,
        type:String,
        unique:true
    }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;


