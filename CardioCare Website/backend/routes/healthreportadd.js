const express = require("express");
const router = express.Router();
const connection = require("../database/mysql"); 

// Route to insert or update the health report for a specific user
router.post('/:userId', async (req, res) => {
    const { userId } = req.params;
    const { dietaryRecommendations, physicalActivities, lifestyleChanges, warningSigns } = req.body;

    try {
        // Check if health report already exists for the user
        const checkQuery = `SELECT * FROM health_report WHERE userId = ?`;
        
        const existingReport = await new Promise((resolve, reject) => {
            connection.query(checkQuery, [userId], (err, result) => {
                if (err) reject("An error occurred while checking the user's health report.");
                resolve(result);
            });
        });

        if (existingReport.length > 0) {
            // If report exists, update the existing record
            const updateQuery = `
                UPDATE health_report 
                SET dietaryRecommendations = ?, physicalActivities = ?, lifestyleChanges = ?, warningSigns = ?
                WHERE userId = ?`;
            
            await new Promise((resolve, reject) => {
                connection.query(updateQuery, [dietaryRecommendations, physicalActivities, lifestyleChanges, warningSigns, userId], (err, result) => {
                    if (err) reject("An error occurred while updating the health report.");
                    resolve(result);
                });
            });

            return res.status(200).json({ message: "Health report updated successfully." });
        } else {
            // If no report exists, insert a new health report
            const insertQuery = `
                INSERT INTO health_report (userId, dietaryRecommendations, physicalActivities, lifestyleChanges, warningSigns) 
                VALUES (?, ?, ?, ?, ?)`;

            await new Promise((resolve, reject) => {
                connection.query(insertQuery, [userId, dietaryRecommendations, physicalActivities, lifestyleChanges, warningSigns], (err, result) => {
                    if (err) reject("An error occurred while inserting the health report.");
                    resolve(result);
                });
            });

            return res.status(201).json({ message: "Health report created successfully." });
        }
    } catch (error) {
        console.error("Server error:", error);
        return res.status(500).json({ error: "An error occurred while processing your request." });
    }
});

module.exports = router;
