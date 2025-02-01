const express = require("express");
const router = express.Router();

// ✅ Corrected route
router.get('/user/signup', (req, res) => {
    res.render("signup");  // Make sure 'signup.ejs' exists in 'views' folder
});
router.get('/user/login', (req, res) => {
    res.render("login");  // Make sure 'signup.ejs' exists in 'views' folder
});

module.exports = router;
