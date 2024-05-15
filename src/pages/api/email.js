import nodemailer from 'nodemailer';

export default async function handler(req, res) {
    var nodemailer = require('nodemailer')
    if (req.method === 'POST') {
        const { name, email, subject, message } = req.body;

        // Create a transporter to send emails (replace with your email configuration)
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'rspreier@gmail.com',
              pass: process.env.EMAIL_PASS
            }
          })

        // Define email options
        const mailOptions = {
            from: email,
            to: 'rspreier@gmail.com',
            subject: subject,
            text: `From: ${name}\n\n${message}`,
        };

        try {
            // Send the email
            await transporter.sendMail(mailOptions);
            res.status(200).json({ message: 'Email sent successfully' });
        } catch (error) {
            console.error('Error sending email:', error);
            res.status(500).json({ message: 'An error occurred while sending the email' });
        }
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}