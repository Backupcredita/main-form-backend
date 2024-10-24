const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');

// Initialize Express
const app = express();
const port = process.env.PORT || 19594;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MySQL database connection
const db = mysql.createConnection({
    host: 'mysql-loan-application-backupcredita-5ebc.g.aivencloud.com',
    user: 'avnadmin',
    password: 'AVNS_imXagB_IpbsjzLVeOfc',  // Replace with your MySQL root password
    database: 'inquiry_form',
    port:19594
});

// Connect to the database
db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
    } else {
        console.log('Connected to MySQL database');
    }
});

// API route for form submission
app.post('/submit-inquiry', (req, res) => {
    const {
        name,
        email,
        mobile,
        interested,
        businessType,
        annualIncome,
        salaryRange,
        companyName
    } = req.body;

    // Insert data into MySQL table
    const query = `
        INSERT INTO inquiries (name, email, mobile, interested_in, business_type, annual_income, salary_range, company_name)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    
    db.query(query, [name, email, mobile, interested, businessType, annualIncome, salaryRange, companyName], (err, results) => {
        if (err) {
            console.error('Error saving inquiry to the database:', err);
            res.status(500).json({ message: 'Failed to submit inquiry.' });
        } else {
            console.log('Inquiry saved:', results);
            res.status(200).json({ message: 'Inquiry submitted successfully!' });
        }
    });
});

// Start the server
app.listen(port, () => {
    console.log(`https://main-form-backend.onrender.com: ${19594}`);
});
