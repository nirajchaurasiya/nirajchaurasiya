import nodemailer from 'nodemailer';

export default async function handler(req, res) {
    const transporter = nodemailer.createTransport({
        host: process.env.HOST,
        port: 465,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD,
        },
    });

    async function sendEmail(user_email, message, name) {
        console.log(user_email, message, name);
        try {
            const mailOptions = {
                from: user_email,
                to: process.env.EMAIL,
                subject: 'New Inquiry',
                html: `
                    <h3>New Inquiry</h3>
                    <p><strong>Name:</strong> ${name}</p>
                    <p><strong>Email:</strong> ${user_email}</p>
                    <p><strong>Message:</strong> ${message}</p>
                    <style>
                        h3 {
                            color: #333;
                            font-size: 18px;
                            margin-bottom: 10px;
                        }
                        p {
                            margin-bottom: 5px;
                        }
                    </style>
                `,
            };

            const info = await transporter.sendMail(mailOptions);
            console.log('Email sent:', info.response);
            res.status(200).json({ message: 'Email sent successfully' });
        } catch (error) {
            console.error('Error sending email:', error);
            res.status(500).json({ error: 'Failed to send email' });
        }
    }

    if (req.method === 'POST') {
        const { email, message, name } = req.body;
        console.log(email, message, name);
        await sendEmail(email, message, name);
    } else {
        res.status(405).json({ error: 'Method Not Allowed' });
    }
}
