const mongoose = require("mongoose");

const signupSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    roles: {
        type: String,
        default: "NORMAL"
    },
}, { timestamps: true });


const SignupDetail = mongoose.model("SignupDetail", signupSchema);

module.exports = SignupDetail;
