const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const recommendationSchema = new Schema({
    destination_name: { type: String, required: true },
    results: [
        {
            destination_name: String,
            category: String,
            price: Number,
            description: String,
            rating: Number,
            image: String,
        },
    ],
});

const Recommendation = mongoose.model("Recommendation", recommendationSchema);

module.exports = Recommendation;
