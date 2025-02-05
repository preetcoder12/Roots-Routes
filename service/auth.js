const jwt = require("jsonwebtoken");
const secret = "Preet@12345";
function setUser(id, user) {
    return jwt.sign(
        { _id: id, email: user.email, roles: user.roles || "NORMAL" },  // ✅ Ensure roles exist
        secret,
        { expiresIn: "2h" }  // Increase expiration
    );
}


function getUser(token) {
    try {
        return jwt.verify(token, secret);
    } catch (error) {
        return null;
    }
}

module.exports = { setUser, getUser };
