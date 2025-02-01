const express = require("express");
const { handleShowAllUsers, handlesignup, handlelogin } = require("../controllers/user");
const { restrictuser } = require("../middleware/auth");

const router = express.Router();

// Protect home route with restrictuser middleware
router.get('/', restrictuser, handleShowAllUsers);

router.post('/signup', handlesignup);
router.post('/login', handlelogin);

// Redirect to homepage after login/signup success
router.get('/home', restrictuser, (req, res) => {
    res.render("home");
});

module.exports = router;
