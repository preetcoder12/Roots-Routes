const jwt = require("jsonwebtoken");
const secret = "Preet@12345";

function setUser(id, user) {
    return jwt.sign(
        { _id: id, email: user.email, roles: user.roles },
        secret,
        { expiresIn: "1h" }
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
