require('dotenv').config();
const mysql = require('mysql');

// Create a connection to the MySQL database
const connection = mysql.createConnection({
    host: process.env.DB_SERVER,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT, // Ensure the port is correctly specified
});

// Connect to the database
connection.connect((err) => {
    if (err) {
        console.error('Database connection error:', err);
        return;
    }
    console.log('Connected to MySQL - (AI-CardioCare DB Connected)');
});

module.exports = connection;
