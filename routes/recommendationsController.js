const axios = require("axios");
const Recommendation = require("../models/Recommendation");

const FLASK_URL = "https://flask-ml-pf6kxjxcyq-et.a.run.app/recommend"; // Replace with your Flask app URL

const getRecommendationsFromFlask = async (destination_name) => {
    try {
        const response = await axios.post(FLASK_URL, { destination_name });
        console.log("Flask API Response:", response.data); // Log the response data
        return response.data;
    } catch (error) {
        console.error(
            "Error fetching recommendations from Flask API:",
            error.message
        );
        throw new Error("Error fetching recommendations from Flask API");
    }
};

const saveRecommendationsToMongoDB = async (destination_name) => {
    try {
        const recommendations = await getRecommendationsFromFlask(
            destination_name
        );

        // Extract recommendations from the received object
        const recommendationsArray = Object.keys(recommendations).map(
            (key) => recommendations[key]
        );

        // Validate recommendations data
        if (!Array.isArray(recommendationsArray)) {
            throw new Error("Invalid data format received from Flask API");
        }

        // Format the recommendations in the desired structure
        const formattedRecommendations = {
            destination_name: destination_name,
            results: recommendationsArray,
        };

        // Save formatted recommendations to MongoDB
        const savedRecommendations = await Recommendation.create(
            formattedRecommendations
        );

        console.log("Saved Recommendations:", savedRecommendations); // Log saved recommendations
        return savedRecommendations;
    } catch (error) {
        console.error(
            "Error saving recommendations to MongoDB:",
            error.message
        );
        throw new Error("Error saving recommendations to MongoDB");
    }
};

module.exports = {
    getRecommendationsFromFlask,
    saveRecommendationsToMongoDB,
};
