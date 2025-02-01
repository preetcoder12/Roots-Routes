const { v4: uuidv4 } = require('uuid'); // Use require instead of import
const SignupDetail = require("../models/signup");
const { setUser } = require("../service/auth");
const { json } = require('express');

async function handleShowAllUsers(req, res) {
    try {
        const allUsers = await SignupDetail.find({}); // Fetch users from SignupDetail
        return res.status(200).render("home", { users: allUsers }); // Pass users to view
    } catch (error) {
        console.error("Error fetching users:", error);
        return res.status(500).json({ message: "Error fetching users", error });
    }
}

async function handlesignup(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ msg: "Error: Email and Password are required" });
    }
    try {

        // Save new user

        const existinguser = await SignupDetail.findOne({ email });

        if (existinguser) {
            console.log("User already exists:", email);

            return res.render("signup")
        }
        const newuser = await SignupDetail.create({ email, password });
        console.log("new user", newuser);
        res.redirect('/user/login');
    } catch(error){
        return res.status(500).json({ error: "internal server error" });
    }

}

async function handlelogin(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ msg: "Error: Email and Password are required" });
    }

    // Find the user by email and password
    try{
        const user = await SignupDetail.findOne({ email, password });
        
        if (!user) {
            
            return res.render("login",{error:"User does not exist"})
        }
        
        // Generate a session ID
        const sessionId = uuidv4();
        console.log("my session id generated by uuidv4() is : ", sessionId);
        
        // Store the user data with the session ID
        setUser(sessionId, user);
        
        // Set the session ID as a cookie
        res.cookie("uid", sessionId);
        
        // Pass the user object to the home page view
        res.render("home", { user: user, sessionId: sessionId }); // Pass user details to the home view
        
    }catch(error){
        return res.status(500).json({error:"Internal server error"});
    }
}

module.exports = {
    handleShowAllUsers,
    handlesignup,
    handlelogin,
};
