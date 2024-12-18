const express = require("express");
const router = express.Router();
const connection = require("../database/mysql");  // Assuming mysql connection is properly configured

// Route to add or update heart details
router.post('/', async (req, res) => {
    const {
        userId,
        age,
        gender,
        restingBP,
        cholesterol,
        fastingBS,
        maxHR,
        exerciseAngina,
        oldPeak,
        smoking,
        hyperTension,
        diabetes,
        familyHistory,
        chestPainType,
        restingECG,
        stSlope,
        predictionResult,
        probability
    } = req.body;

    try {
        // Query to check if userId already exists
        const checkQuery = `SELECT userId FROM HealthDetails WHERE userId = ?`;
        const checkResult = await new Promise((resolve, reject) => {
            connection.query(checkQuery, [userId], (err, result) => {
                if (err) reject("An error occurred while checking the user's health details.");
                resolve(result);
            });
        });

        if (checkResult.length > 0) {
            // Update existing record, including predictionResult and probability
            const updateQuery = `
                UPDATE HealthDetails 
                SET 
                    age = ?, gender = ?, restingBP = ?, cholesterol = ?, fastingBS = ?, 
                    maxHR = ?, exerciseAngina = ?, oldPeak = ?, smoking = ?, 
                    hyperTension = ?, diabetes = ?, familyHistory = ?, chestPainType = ?, 
                    restingECG = ?, stSlope = ?, predictionResult = ?, probability = ? 
                WHERE userId = ?
            `;

            const updateValues = [
                age, gender, restingBP, cholesterol, fastingBS,
                maxHR, exerciseAngina, oldPeak, smoking,
                hyperTension, diabetes, familyHistory, chestPainType,
                restingECG, stSlope, predictionResult, probability, userId
            ];

            await new Promise((resolve, reject) => {
                connection.query(updateQuery, updateValues, (err, updateResult) => {
                    if (err) reject("An error occurred while updating health details.");
                    resolve(updateResult);
                });
            });

            return res.status(200).json({ message: "Health details updated successfully." });
        } else {
            // Insert new record with predictionResult and probability
            const insertQuery = `
                INSERT INTO HealthDetails (
                    userId, age, gender, restingBP, cholesterol, fastingBS, 
                    maxHR, exerciseAngina, oldPeak, smoking, hyperTension, 
                    diabetes, familyHistory, chestPainType, restingECG, stSlope,
                    predictionResult, probability
                ) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? , ?)
            `;

            const insertValues = [
                userId, age, gender, restingBP, cholesterol, fastingBS,
                maxHR, exerciseAngina, oldPeak, smoking, hyperTension,
                diabetes, familyHistory, chestPainType, restingECG, stSlope,
                predictionResult, probability
            ];

            await new Promise((resolve, reject) => {
                connection.query(insertQuery, insertValues, (err, insertResult) => {
                    if (err) {
                        console.error("MySQL error: ", err);  // Log the error to get more information
                        reject("An error occurred while inserting health details.");
                    }
                    resolve(insertResult);
                });
            });

            return res.status(201).json({ message: "Health details added successfully." });
        }
    } catch (error) {
        console.error("Server error:", error);
        return res.status(500).json({ error: "An error occurred while processing your request." });
    }
});

module.exports = router;
