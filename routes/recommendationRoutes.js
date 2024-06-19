const express = require("express");
const recommendationController = require("./recommendationsController");

const router = express.Router();

// Route to handle saving recommendations
router.post("/", async (req, res) => {
    try {
        const { destination_name } = req.body;

        // Validate input
        if (!destination_name) {
            return res
                .status(400)
                .json({ error: "destination_name is required" });
        }

        const savedRecommendations =
            await recommendationController.saveRecommendationsToMongoDB(
                destination_name
            );
        res.status(200).json({
            message: "Recommendations saved successfully",
            data: savedRecommendations,
        });
    } catch (error) {
        console.error("Error in save-recommendation route:", error.message);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
