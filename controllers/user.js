const { v4: uuidv4 } = require('uuid'); // Use require instead of import
const SignupDetail = require("../models/signup");
const { setUser } = require("../service/auth");
const bcrypt = require("bcrypt");

async function handleShowAllUsers(req, res) {
    try {
        const users = await SignupDetail.find({});
        res.render("home", { users });
    } catch (error) {
        res.status(500).json({ message: "Error fetching users" });
    }
}

async function handlesignup(req, res) {
    console.log("Received signup request:", req.body); // 🔍 Debugging line

    const { email, password } = req.body;

    if (!email || !password ) {
        console.log("Missing required fields!", req.body); // 🔍 Debugging line
        return res.status(400).json({ msg: "Error: Email, and Password are required" });
    }

    try {
        const existinguser = await SignupDetail.findOne({ email });

        if (existinguser) {
            console.log("User already exists:", existinguser.email); // 🔍 Debugging line
            return res.render("signup", { error: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10); // Hash password

        const newuser = await SignupDetail.create({ email, password: hashedPassword });
        console.log("New user created:", newuser); // 🔍 Debugging line

        res.redirect('/user/login');
    } catch (error) {
        console.error("Signup error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}


async function handlelogin(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ msg: "Error: Email and Password are required" });
    }

    try {
        const user = await SignupDetail.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            console.log("Invalid email or password");  // 🔍 Debugging line
            return res.render("login", { error: "Invalid email or password" });
        }

        const token = setUser(user._id, user);
        res.cookie("uid", token, { httpOnly: true });

        console.log("User authenticated! Redirecting..."); // 🔍 Debugging line
        return res.redirect("/"); // ✅ Redirecting to home

    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}


module.exports = {
    handleShowAllUsers,
    handlesignup,
    handlelogin,
};
