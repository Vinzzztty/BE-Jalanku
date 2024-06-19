function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    // User is not authenticated, redirect or respond with an error message
    res.status(401).send("Unauthorized");
}

module.exports = ensureAuthenticated;
