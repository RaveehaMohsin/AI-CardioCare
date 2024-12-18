const express = require("express");
const router = express.Router();
const connection = require("../../database/mysql"); // Assuming connection is already made

// Route for fetching admin feedback
router.get("/", (req, res) => {
  const query = `
    SELECT 
      f.FeedbackId,
      f.fromUserId,
      f.toUserId,
      f.rating,
      f.comments,
      f.submissionDate,
      f.recommendtoothers,
      f.experience,
      fromUser.firstName AS fromFirstName,
      fromUser.lastName AS fromLastName,
      toUser.firstName AS toFirstName,
      toUser.lastName AS toLastName
    FROM Feedback f
    JOIN Users fromUser ON f.fromUserId = fromUser.userId
    JOIN Users toUser ON f.toUserId = toUser.userId
    WHERE f.toUserId = 2;
  `;

  connection.query(query, (error, results) => {
    if (error) {
      console.error("Database error:", error);
      res.status(500).json({ error: "Internal server error" });
    } else if (results.length > 0) {
      res.status(200).json(results);
    } else {
      res.status(404).json({ message: "No feedback found for admin" });
    }
  });
});
module.exports = router;
