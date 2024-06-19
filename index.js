const express = require("express");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
const connectDB = require("./config/dbConfig");

// Load environment variables
require("dotenv").config();

const app = express();

// Connect to MongoDB
connectDB();

app.set("trust proxt", 1);
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
    session({
        secret: "secret",
        resave: false,
        saveUninitialized: false,
    })
);

app.use(passport.initialize());
app.use(passport.session());

// Passport configuration
require("./config/passportConfig");

// Routes
app.use("/auth", require("./routes/authRoutes"));
app.use("/", require("./routes/indexRoutes"));
app.use("/api/recommend", require("./routes/recommendationRoutes"));

// Start the server
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`🚀 [SERVER] is running on port http://localhost:${port}`);
});

// module.exports = app;
