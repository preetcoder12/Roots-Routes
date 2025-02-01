const sessiontoUser = new Map(); // Make sure Map is capitalized

// Store user data with a unique session ID
async function setUser(id, user) {
    sessiontoUser.set(id, user);
}

// Get user data using the session ID
async function getUser(id) {
    return sessiontoUser.get(id); // Return the user data
}

module.exports = {
    setUser,
    getUser,
};
