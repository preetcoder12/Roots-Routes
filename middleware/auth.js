const { getUser } = require("../service/auth");


function checkForAuthorization(req, res, next) {
    const token = req.cookies.uid;
    console.log("🔹 Token received:", token);  // ✅ Debugging line

    if (!token) {
        console.log("❌ No token found!");
        return next();  // Move to next middleware (unauthenticated)
    }

    const user = getUser(token);
    console.log("🔹 Decoded User:", user);  // ✅ Debugging line

    if (user) {
        req.user = user;
        console.log("✅ User authenticated:", req.user);
    } else {
        console.log("❌ Invalid or expired token!");
    }

    next();
}
function restrictTO(roles = []) {
    return function (req, res, next) {
        if (!req.user) {
            console.log("❌ No user found, redirecting to login");
            return res.redirect("/user/login");
        }

        console.log("🔹 Checking user role:", req.user.roles);

        if (!req.user.roles || !roles.includes(req.user.roles.toUpperCase())) {
            console.log("❌ Unauthorized access! User role:", req.user.roles);
            return res.status(403).send("Unauthorized");
        }

        next();
    };
}


module.exports = {
    checkForAuthorization,
    restrictTO,
};
