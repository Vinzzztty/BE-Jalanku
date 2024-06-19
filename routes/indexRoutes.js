// const express = require("express");
// const router = express.Router();
// const ensureAuthenticated = require("../middleware/ensureAuthenticated");
// const authenticateJWT = require("../middleware/auth");

// router.get("/profile", ensureAuthenticated, (req, res) => {
//     res.send("Welcome to your profile, " + req.user.username);
// });

// router.get("/profile2", authenticateJWT, (req, res) => {
//     // Access the authenticated user's data through req.user
//     res.send({ user: req.user });
// });

// module.exports = router;

/////////////////////////////

// routes/index.js
const express = require("express");
const router = express.Router();

// Index route
router.get("/", (req, res) => {
    res.send("Welcome to JalanKu!");
});

// Protected route
router.get("/home", authenticateToken, (req, res) => {
    res.send("Protected route accessed successfully!");
});

// Authentication middleware
function authenticateToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) return res.sendStatus(401);

    jwt.verify(token, "your_jwt_secret_here", (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}

module.exports = router;
