const express = require("express");
const router = express.Router();
const connection = require("../../database/mysql"); // Assuming the MySQL connection is exported from this file

router.post("/", async (req, res) => {
    const { email, password } = req.body;

    // Validate input fields
    if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required" });
    }

    try {
        // Query to check user credentials
        const query = `
            SELECT 
                userId, firstName, lastName, email, password, role
            FROM Users
            WHERE email = ? AND password = ?
        `;

        connection.query(query, [email, password], (err, results) => {
            if (err) {
                console.error("Error during login:", err);
                return res.status(500).json({ error: "An error occurred while processing the login" });
            }

            // Check if the user exists
            if (!results || results.length === 0) {
                return res.status(401).json({ error: "Invalid email or password" });
            }

            const user = results[0]; // Get the first user from the results
            res.status(200).json({ user });
        });
    } catch (err) {
        console.error("Unexpected error during login:", err);
        res.status(500).json({ error: "An unexpected error occurred" });
    }
});

module.exports = router;
