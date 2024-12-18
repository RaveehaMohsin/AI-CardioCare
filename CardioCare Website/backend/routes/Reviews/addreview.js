const express = require("express");
const router = express.Router();
const connection = require("../../database/mysql"); // Assuming connection is already made

router.post("/", async (req, res) => {
  const { rating, comments, recommend, experience, submissionDate, fromUserId, toUserId } = req.body;

  if (!fromUserId || !toUserId || !experience || !submissionDate) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    // Convert the ISO date to a MySQL-compatible format (if necessary)
    const formattedDate = new Date(submissionDate).toISOString().slice(0, 10);

    // SQL query with placeholders for values
    const query = `
      INSERT INTO Feedback (fromUserId, toUserId, rating, comments, submissionDate, recommendtoothers, experience)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    // Values to insert into the query
    const values = [
      fromUserId,
      toUserId,
      rating,
      comments,
      formattedDate,
      recommend,
      experience
    ];

    // Execute the query using the existing connection
    connection.query(query, values, (err, result) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).json({ error: "Internal server error" });
      }

      if (result.affectedRows > 0) {
        res.status(201).json({ message: "Feedback added successfully" });
      } else {
        res.status(500).json({ error: "Failed to add feedback" });
      }
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
