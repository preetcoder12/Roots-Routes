const mongoose = require("mongoose")

function connectMongoDB(){
    return mongoose.connect("mongodb://127.0.0.1:27017/practice_01");
}

module.exports = {
    connectMongoDB,
}