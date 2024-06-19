// const passport = require("passport");
// const GoogleStrategy = require("passport-google-oauth2").Strategy;
// const User = require("../models/User");
// const jwt = require("jsonwebtoken");

// passport.use(
//     new GoogleStrategy(
//         {
//             clientID: process.env.GOOGLE_CLIENT_ID,
//             clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//             callbackURL: "https://be-jalanku.vercel.app/auth/google/callback",
//             // callbackURL: "http://localhost:5000/auth/google/callback",
//         },
//         async (accessToken, refreshToken, profile, done) => {
//             try {
//                 const googleId = profile.id;
//                 const email = profile.emails[0].value; // Use the first email in the array
//                 const username = profile.displayName;

//                 // Check if user already exists
//                 let user = await User.findOne({
//                     $or: [{ googleId: googleId }, { email: email }],
//                 });

//                 if (!user) {
//                     // Create a new user if not found
//                     user = await User.create({
//                         googleId: googleId,
//                         username: username,
//                         email: email,
//                     });
//                 }

//                 return done(null, user);
//             } catch (error) {
//                 return done(error);
//             }
//         }
//     )
// );

// passport.serializeUser((user, done) => {
//     done(null, user.id);
// });

// passport.deserializeUser(async (id, done) => {
//     try {
//         const user = await User.findById(id);
//         done(null, user);
//     } catch (error) {
//         done(error);
//     }
// });

// passport.js
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2").Strategy;
const User = require("../models/User");
require("dotenv").config();

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: "/auth/google/callback",
        },
        async (accessToken, refreshToken, profile, done) => {
            // Check if user already exists in your database
            let user = await User.findOne({ googleId: profile.id });

            if (!user) {
                // Create a new user if not exists
                user = new User({
                    googleId: profile.id,
                    displayName: profile.displayName,
                    email: profile.emails[0].value,
                    // Add other relevant fields as needed
                });
                await user.save();
            }

            return done(null, user);
        }
    )
);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    });
});
