const express = require("express");
const router = express.Router();
const connection = require("../../database/mysql"); // Assuming MySQL connection setup

// Route to get students
router.get('/', async (req, res) => {
    try {
        const query = `
            SELECT u.userId, 
                   u.firstName, 
                   u.lastName, 
                   u.email, 
                   u.password, 
                   u.role, 
                   p.Gender, 
                   p.PhoneNo, 
                   p.CNIC, 
                   p.DOB, 
                   p.Address, 
                   p.City, 
                   p.Country, 
                   p.Img
            FROM Users u
            JOIN Person p
                ON u.userId = p.userId
            WHERE u.role = 'Patient'
        `;

        connection.query(query, (err, result) => {
            if (err) {
                console.error("Database error:", err);
                return res.status(500).json({ error: "An error occurred while fetching Patients information." });
            }

            // Check if any student data was found
            if (result.length === 0) {
                return res.status(404).json({ message: "No Patients found." });
            }

            // Respond with the student data
            res.status(200).json(result);
        });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "An error occurred while fetching Patients information." });
    }
});
module.exports = router;