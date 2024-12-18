const express = require("express");
const router = express.Router();
const connection = require("../../database/mysql"); 

// Route to fetch all health details
router.get('/', async (req, res) => {
    try {
        // Query to get all health details
        const selectQuery = `SELECT * FROM HealthDetails`;

        const healthDetails = await new Promise((resolve, reject) => {
            connection.query(selectQuery, (err, result) => {
                if (err) reject("An error occurred while fetching the health details.");
                resolve(result);
            });
        });

        if (healthDetails.length > 0) {
            // Return all health details if found
            return res.status(200).json(healthDetails);
        } else {
            // If no records are found
            return res.status(404).json({ message: "No health details found." });
        }
    } catch (error) {
        console.error("Server error:", error);
        return res.status(500).json({ error: "An error occurred while processing your request." });
    }
});

module.exports = router;
