const express = require("express");
const router = express.Router();
const connection = require("../database/mysql"); 

// Route to get the health report of a specific user
router.get('/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
        // Query to get health report by userId
        const selectQuery = `SELECT * FROM health_report WHERE userId = ?`;

        const healthReport = await new Promise((resolve, reject) => {
            connection.query(selectQuery, [userId], (err, result) => {
                if (err) reject("An error occurred while fetching the user's health report.");
                resolve(result);
            });
        });

        if (healthReport.length > 0) {
            // Return the health report if found
            return res.status(200).json(healthReport[0]);
        } else {
            // If no report is found for the userId
            return res.status(404).json({ message: "No health report found for this user." });
        }
    } catch (error) {
        console.error("Server error:", error);
        return res.status(500).json({ error: "An error occurred while processing your request." });
    }
});


module.exports = router;