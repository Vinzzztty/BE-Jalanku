const express = require("express");
const passport = require("passport");
const router = express.Router();
const jwt = require("jsonwebtoken");
// router.get(
//     "/google",
//     passport.authenticate("google", { scope: ["profile", "email"] })
// );

// router.get(
//     "/google/callback",
//     passport.authenticate("google", { failureRedirect: "/login" }),
//     (req, res) => {
//         res.redirect("https://www.jalanku.xyz/");
//     }
// );

// router.get("/logout", (req, res) => {
//     req.logout((err) => {
//         if (err) {
//             return res.status(500).send("Error logging out");
//         }
//         res.redirect("/");
//     });
// });

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
        // // Redirect to the client application with the token as a query parameter
        // res.redirect(`http://localhost:3000/profile?token=${req.user.token}`);

        // Generate JWT token
        const token = jwt.sign(
            { userId: req.user.id },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        // Respond with JSON containing the token
        res.json({ token });
    }
);

router.get("/logout", (req, res) => {
    req.logout((err) => {
        if (err) {
            return res.status(500).send("Error logging out");
        }
        res.send({ message: "Ikkeh" });
    });
});

module.exports = router;
