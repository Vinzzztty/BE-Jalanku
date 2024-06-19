const express = require("express");
const passport = require("passport");
const router = express.Router();
const jwt = require("jsonwebtoken");

router.get(
    "/login",
    passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
    "/register",
    passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
    "/google/callback",
    passport.authenticate("google", { failureRedirect: "/login" }),
    (req, res) => {
        // Generate a JWT token
        const token = jwt.sign(
            { id: req.user._id, email: req.user.email },
            process.env.JWT_SECRET,
            {
                expiresIn: "1h", // Token expires in 1 hour
            }
        );

        // Set token in cookies
        res.cookie("jwt", token, {
            httpOnly: true,
            secure: true, // Set to true if using HTTPS
            sameSite: "none", // Adjust according to your setup (e.g., "lax", "strict")
            maxAge: 3600000, // 1 hour (expiration time)
        });

        // Redirect to the profile page
        // res.redirect("/");
        res.redirect("https://www.jalanku.xyz/");
    }
);

router.get("/logout", (req, res) => {
    // Clear the JWT cookie
    res.clearCookie("jwt");

    // Logout using Passport.js
    // req.logout();

    // Redirect to home or login page
    res.redirect("/");
});
module.exports = router;
