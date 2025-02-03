const { getUser } = require("../service/auth");


function checkForAuthorization(req, res, next) {
    const token = req.cookies.uid;
    if (!token) return next();
    const user = getUser(token);
    if (user) req.user = user;
    next();
}

function restrictTO(roles = []) {
    return function (req, res, next) {
        const token = req.cookies.uid;
        if (!token) { return res.redirect("/user/login"); }

        const user = req.user; 
        if (!user || !roles.includes(user.roles)) {
            return res.status(403).send("Unauthorized");
        }
        next();
    };
}


module.exports = {
    checkForAuthorization,
    restrictTO,
};
