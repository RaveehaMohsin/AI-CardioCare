const express = require("express");
const router = express.Router();
const multer = require("multer");
const connection = require("../database/mysql");

// Storage configuration for multer
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./public/personImages"); 
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname); 
    },
});

var upload = multer({ storage });

router.post("/", upload.single("profileImage"), async (req, res) => {
    const {
        userId,
        gender,
        phoneNo,
        cnic,
        dob,
        address,
        city,
        country,
    } = req.body;

    // img will come from multer
    const img = req.file ? `/personImages/${req.file.filename}` : null; // Store the file path if file exists

    try {
        // Check if the user already exists in MySQL
        const checkQuery = `
            SELECT COUNT(*) AS count FROM Person WHERE userId = ?
        `;
        connection.query(checkQuery, [userId], (err, results) => {
            if (err) {
                console.error("Database error:", err);
                return res.status(500).json({ error: "An error occurred while processing your request." });
            }

            const userExists = results[0].count > 0;

            if (userExists) {
                // Update the existing record
                const updateQuery = `
                    UPDATE Person
                    SET Gender = ?, PhoneNo = ?, CNIC = ?, DOB = ?, Address = ?, City = ?, Country = ?, Img = ?
                    WHERE userId = ?
                `;
                connection.query(updateQuery, [gender, phoneNo, cnic, dob, address, city, country, img, userId], (err, result) => {
                    if (err) {
                        console.error("Database error:", err);
                        return res.status(500).json({ error: "An error occurred while updating user information." });
                    }

                    res.status(200).json({ message: "User information updated successfully." });
                });
            } else {
                // Insert a new record if the user doesn't exist
                const insertQuery = `
                    INSERT INTO Person (userId, Gender, PhoneNo, CNIC, DOB, Address, City, Country, Img)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
                `;
                connection.query(insertQuery, [userId, gender, phoneNo, cnic, dob, address, city, country, img], (err, result) => {
                    if (err) {
                        console.error("Database error:", err);
                        return res.status(500).json({ error: "An error occurred while adding user information." });
                    }

                    res.status(201).json({ message: "User information added successfully." });
                });
            }
        });
    } catch (error) {
        console.error("Server error:", error);
        res.status(500).json({ error: "An error occurred while processing your request." });
    }
});

module.exports = router;
