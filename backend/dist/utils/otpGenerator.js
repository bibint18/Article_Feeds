import nodemailer from 'nodemailer';
export const generateOtp = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};
export const sendOtpEmail = async (email, otp) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });
    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Your OTP for Registration',
        text: `Your OTP is ${otp}. It is valid for 10 minutes.`,
    });
};
