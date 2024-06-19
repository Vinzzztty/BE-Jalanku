const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2").Strategy;
const User = require("../models/User");
const jwt = require("jsonwebtoken");

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: "https://be-jalanku.vercel.app/auth/google/callback",
            // passReqToCallback: true,
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                const googleId = profile.id;
                const email = profile.emails[0].value; // Use the first email in the array
                const username = profile.displayName;

                // Check if user already exists
                let user = await User.findOne({
                    $or: [{ googleId: googleId }, { email: email }],
                });

                if (!user) {
                    // Create a new user if not found
                    user = await User.create({
                        googleId: googleId,
                        username: username,
                        email: email,
                    });
                }

                // Generate a JWT token
                const token = jwt.sign(
                    { id: user.id, email: user.email },
                    process.env.JWT_SECRET,
                    {
                        expiresIn: "1h", // Token expires in 1 hour
                    }
                );

                // Include the token in the user object
                user.token = token;

                return done(null, user);
            } catch (error) {
                return done(error);
            }
        }
    )
);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (error) {
        done(error);
    }
});
