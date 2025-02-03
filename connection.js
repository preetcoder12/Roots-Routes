const mongoose = require("mongoose");

async function connectMongoDB() {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/practice_01", {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Connected to MongoDB successfully!");
    } catch (error) {
        console.error("MongoDB connection error:", error);
        process.exit(1);
    }
}

module.exports = { connectMongoDB };
