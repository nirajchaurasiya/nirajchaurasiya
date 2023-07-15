const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
    host: process.env.HOST,
    port: 465,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
    },
});
async function sendEmail(user_email, subject, text) {
    try {
        const mailOptions = {
            from: user_email,
            to: process.env.EMAIL,
            subject,
            text,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.response);
    } catch (error) {
        console.error('Error sending email:', error);
    }
}
module.exports = { sendEmail };
