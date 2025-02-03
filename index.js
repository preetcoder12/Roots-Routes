const express = require("express");
const { connectMongoDB } = require("./connection");
const userRouter = require("./routes/user");
const staticRoute = require("./routes/staticRoute");
const { checkForAuthorization, restrictTO } = require("./middleware/auth");
const cookieParser = require("cookie-parser");

const port = 8001;
const app = express();

// ✅ Log all incoming requests for debugging
app.use((req, res, next) => {
    console.log(`[${req.method}] ${req.url}`);
    console.log("Request Body:", req.body);
    next();
});

// ✅ Required for JSON body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(checkForAuthorization);

app.set("view engine", "ejs");

// ✅ Debug login state
app.get("/", restrictTO(["NORMAL"]), (req, res) => {
    console.log("Current User:", req.user);
    return res.render("home", { user: req.user });
});

// ✅ Handle MongoDB connection errors
connectMongoDB().then(() => console.log("Connected to MongoDB successfully!")).catch(err => console.error("MongoDB Connection Error:", err));

// ✅ Use routes properly
app.use("/user", userRouter);
app.use("/", staticRoute);

app.listen(port, () => {
    console.log(`🚀 Server is running on http://localhost:${port}`);
});
