const express = require("express");
const { connectMongoDB } = require("./connection");
const userRouter = require("./routes/user");
const staticRoute = require("./routes/staticRoute");
const { restrictuser, checkauth } = require("./middleware/auth");
const cookieParser = require("cookie-parser");

const port = 8001;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));  
app.use(cookieParser());
app.set("view engine", "ejs");

app.get("/", restrictuser,(req, res) => {
    res.send("Welcome to my server (aapka swagt hai!!)");
});

// ✅ Handle MongoDB connection errors
connectMongoDB().then(() => console.log("Connected to MongoDB successfully!"))

// ✅ Use routes properly
app.use("/user", userRouter);
app.use("/", staticRoute);  

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
