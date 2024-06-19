const jwt = require("jsonwebtoken");

function authenticateJWT(req, res, next) {
    // Read the JWT token from the request header
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(" ")[1]; // Bearer <token>

        // Verify JWT token
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                return res.status(403).send("Forbidden");
            }
            req.user = user; // Set the authenticated user data in the request object
            next(); // User is authenticated, continue to the next middleware or route handler
        });
    } else {
        res.status(401).send("Unauthorized");
    }
}

module.exports = authenticateJWT;
