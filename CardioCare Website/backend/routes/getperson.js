const express = require("express");
const router = express.Router();
const connection = require("../database/mysql");

router.get('/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
        // Query to fetch the person's information
        const query = `
            SELECT userId, Gender, PhoneNo, CNIC, DOB, Address, City, Country, Img
            FROM Person
            WHERE userId = ?
        `;

        connection.query(query, [userId], (err, result) => {
            if (err) {
                console.error("Database error:", err);
                return res.status(500).json({ error: "An error occurred while fetching the person's information." });
            }

            // Check if the user exists
            if (result.length === 0) {
                return res.status(404).json({ message: "Person not found." });
            }

            // Respond with the person's details
            res.status(200).json(result[0]);
        });
    } catch (error) {
        console.error("Server error:", error);
        res.status(500).json({ error: "An error occurred while processing your request." });
    }
});

module.exports = router;
