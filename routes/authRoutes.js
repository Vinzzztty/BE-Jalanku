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
        try {
            // Generate a JWT token
            const token = jwt.sign(
                { id: req.user._id, email: req.user.email },
                process.env.JWT_SECRET,
                {
                    expiresIn: "1h", // Token expires in 1 hour
                }
            );

            // Log the JWT token to console
            console.log("Generated JWT token:", token);

            // Set token in cookies
            res.cookie("jwt", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production", // Set to true if using HTTPS
                sameSite: "none", // Adjust according to your setup (e.g., "lax", "strict", "none")
                maxAge: 3600000, // 1 hour (expiration time)
            });

            // Redirect to an external URL using client-side script
            res.send(`
                <script>
                    // Set cookie and redirect
                    document.cookie = 'jwt=${token};max-age=3600;secure;SameSite=None';
                    window.location.href = 'https://www.jalanku.xyz/home';
                </script>
            `);
        } catch (error) {
            console.error("Error in /google/callback:", error);
            res.status(500).send("Internal Server Error");
        }
    }
);

router.get("/logout", (req, res) => {
    // Clear the JWT token cookie
    res.clearCookie("jwt", {
        httpOnly: true,
        secure: true, // Set to true if using HTTPS
        sameSite: "none", // Adjust according to your setup (e.g., "lax", "strict")
    });

    // Redirect to an external URL after clearing the cookie
    res.redirect("https://www.jalanku.xyz/");
});
module.exports = router;
