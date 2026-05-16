const nodemailer = require('nodemailer');
const AppError = require('../error/AppError');

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT),
    secure: false,
    auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD
    }
});

const sendMail = async (options) => {
    try {
        const mailOptions = {
            from: `Sultan 👋 <${process.env.EMAIL_USERNAME}>`,
            to: options.email,
            subject: options.subject,
            text: options.message,
            html: options.html,
        };

        const info = await transporter.sendMail(mailOptions);
        return info;
    } catch (err) {
        throw new AppError("Failed to send email",);
    }
};


module.exports = sendMail