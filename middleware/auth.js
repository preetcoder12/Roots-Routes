const { getUser } = require("../service/auth");

async function restrictuser(req, res, next) {
    const userid = req.cookies.uid;
    if (!userid) { return res.redirect("/user/login") };

    const user = await getUser(userid);
    if (!user) { return res.redirect("/user/login") };

    req.user = user;
    next();


}

async function checkauth(req, res, next) {
    const userid = req.cookies.uid;
    if (!userid) {
        req.user = null;
        return next();  // ✅ Fixed: Added "return next();"
    }
    const user = await getUser(userid);  // ✅ Fixed: Added "await"
    if (!user) {
        req.user = null;
        return next();  // ✅ Fixed: Added "return next();"
    }
    req.user = user;
    next();
}

module.exports = {
    restrictuser,
    checkauth,
};
