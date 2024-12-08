const express = require("express");
const router = express.Router();
const connection = require("../../database/mysql"); // Assuming the MySQL connection is exported from this file

router.post("/", async (req, res) => {
    const { firstName, lastName, email, role, password } = req.body;

    // Validate input fields
    if (!firstName || !lastName || !email || !role || !password) {
        return res.status(400).json({ error: "All fields are required" });
    }

    try {
        // Check if the email already exists in the database
        const checkEmailQuery = `SELECT COUNT(*) AS count FROM Users WHERE email = ?`;

        connection.query(checkEmailQuery, [email], (err, results) => {
            if (err) {
                return res.status(500).json({ error: "Database error" });
            }

            const emailExists = results[0].count > 0;

            if (emailExists) {
                return res.status(400).json({ error: "Email is already registered." });
            }

            // Insert the new user
            const insertQuery = `INSERT INTO Users (firstName, lastName, email, role, password) VALUES (?, ?, ?, ?, ?)`;

            connection.query(insertQuery, [firstName, lastName, email, role, password], (err) => {
                if (err) {
                    return res.status(500).json({ error: "Database error while inserting user" });
                }

                res.status(201).json({ message: "User registered successfully" });
            });
        });
    } catch (err) {
        res.status(500).json({ error: "An error occurred while processing your request." });
    }
});

module.exports = router;
