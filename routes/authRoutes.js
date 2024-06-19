const express = require("express");
const passport = require("passport");
const router = express.Router();
const jwtMiddleware = require("../middleware/jwt");

router.get(
    "/login",
    passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
    "/register",
    passport.authenticate("google", { scope: ["profile", "email"] })
);
// router.get(
//     "/google/callback",
//     passport.authenticate("google", { failureRedirect: "/login" }),
//     (req, res) => {
//         try {
//             // Generate a JWT token
//             const token = jwt.sign(
//                 { id: req.user._id, email: req.user.email },
//                 process.env.JWT_SECRET,
//                 {
//                     expiresIn: "1h", // Token expires in 1 hour
//                 }
//             );

//             // Log the JWT token to console
//             console.log("Generated JWT token:", token);

//             // Set token in cookies
//             res.cookie("jwt", token, {
//                 httpOnly: true,
//                 secure: process.env.NODE_ENV === "production", // Set to true if using HTTPS
//                 sameSite: "none", // Adjust according to your setup (e.g., "lax", "strict", "none")
//                 maxAge: 3600000, // 1 hour (expiration time)
//             });

//             // Redirect to an external URL using client-side script
//             res.send(`
//                 <script>
//                     // Set cookie and redirect
//                     document.cookie = 'jwt=${token};max-age=3600;secure;SameSite=None';
//                     window.location.href = 'https://www.jalanku.xyz/home';
//                 </script>
//             `);
//         } catch (error) {
//             console.error("Error in /google/callback:", error);
//             res.status(500).send("Internal Server Error");
//         }
//     }
// );

router.get(
    "/google/callback",
    passport.authenticate("google", { failureRedirect: "/login" }),
    async (req, res) => {
        try {
            // Generate a JWT token without isAdmin
            const token = await jwtMiddleware.signAccessToken(req.user._id);

            // Set token in cookies
            res.cookie("jwt", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production", // Set to true if using HTTPS
                sameSite: "none", // Adjust according to your setup (e.g., "lax", "strict", "none")
                maxAge: 3600000, // 1 hour (expiration time)
            });

            // Redirect with client-side script
            res.send(`
                <script>
                    document.cookie = 'jwt=${token};max-age=3600;secure;SameSite=None';
                    window.location.href = 'https://www.jalanku.xyz/home';
                </script>
            `);
        } catch (error) {
            console.error("Error in /google/callback:", error); // Log detailed error
            res.status(500).send("Internal Server Error"); // Send generic error response
        }
    }
);

router.post("/logout", jwtMiddleware.verifyAccessToken, async (req, res) => {
    try {
        // No specific action needed to "delete admin" in JWT
        // Simply clear any session data if applicable

        // Respond with logout success message
        res.status(200).json({ message: "User logged out successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
