const express = require("express");
const router = express.Router();
const { transporter } = require("../nodemailer/nodemailer");

router.post('/', async (req, res) => {
    const { name, email, message } = req.body;

    const mailOptions = {
        from: `"${name}" <${email}>`, 
        to: 'mohsinraveeha@gmail.com',
        subject: `Cardio Care : Query from ${name}`,
        html: `<p><strong>Name:</strong> ${name}</p>
               <p><strong>Email:</strong> ${email}</p>
               <p><strong>Message:</strong> ${message}</p>`,
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error sending email', error });
    }
});

module.exports = router;
