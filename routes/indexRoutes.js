const express = require("express");
const router = express.Router();
const ensureAuthenticated = require("../middleware/ensureAuthenticated");
const authenticateJWT = require("../middleware/auth");

router.get("/profile", ensureAuthenticated, (req, res) => {
    res.send("Welcome to your profile, " + req.user.username);
});

router.get("/profile2", authenticateJWT, (req, res) => {
    // Access the authenticated user's data through req.user
    res.send({ user: req.user });
});

module.exports = router;
