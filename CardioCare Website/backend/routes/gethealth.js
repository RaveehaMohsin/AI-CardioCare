const express = require("express");
const router = express.Router();
const connection = require("../database/mysql"); 

// Route to fetch health details based on userId
router.get('/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
        // Query to get health details by userId
        const selectQuery = `SELECT * FROM HealthDetails WHERE userId = ?`;

        const healthDetails = await new Promise((resolve, reject) => {
            connection.query(selectQuery, [userId], (err, result) => {
                if (err) reject("An error occurred while fetching the user's health details.");
                resolve(result);
            });
        });

        if (healthDetails.length > 0) {
            // Return the health details if found
            return res.status(200).json(healthDetails[0]);
        } else {
            // If no record is found for the userId
            return res.status(404).json({ message: "No health details found for this user." });
        }
    } catch (error) {
        console.error("Server error:", error);
        return res.status(500).json({ error: "An error occurred while processing your request." });
    }
});

module.exports = router;
