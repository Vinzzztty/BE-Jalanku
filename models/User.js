const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        googleId: {
            type: String,
            required: true,
            unique: true, // Ensure googleId is unique
        },
        username: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
    },
    {
        timestamps: {
            createdAt: "crdAt",
            updatedAt: "upAt",
        },
    }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
