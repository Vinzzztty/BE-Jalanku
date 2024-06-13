const axios = require("axios");

const FLASK_URL = "https://flask-ml-pf6kxjxcyq-et.a.run.app/recommend"; // Replace with your Flask app URL

const getRecommendationsFromFlask = async (destination_name) => {
    try {
        const response = await axios.post(FLASK_URL, { destination_name });
        return response.data;
    } catch (error) {
        throw new Error("Error fetching recommendations from Flask API");
    }
};

module.exports = {
    getRecommendationsFromFlask,
};
