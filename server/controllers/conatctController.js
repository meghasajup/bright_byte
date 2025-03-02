



import nodemailer from 'nodemailer';
import { asyncHandler } from '../utils/asyncHandler.js';
import { Contact } from '../model/contactSchema.js';

export const newContact = asyncHandler(async (req, res) => {
    const { name, email, subject, message } = req.body;

    const newContact = new Contact({
        name,
        email,
        subject,
        message
    });

    await newContact.save();

    // Set up Nodemailer transporter
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER, // Your Gmail address
            pass: process.env.EMAIL_PASS // Your Gmail password or app-specific password
        }
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: 'josephjeswin20@gmail.com', // Where you want to receive the contact form data
        subject: `New Contact Form Submission: ${subject}`,
        html: `
        <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto;">
            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px;">
                <h2 style="color: #007bff; text-align: center;">New Contact Form Submission</h2>
                <hr style="border: 1px solid #ddd;">
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Subject:</strong> ${subject}</p>
                <p><strong>Message:</strong></p>
                <div style="background-color: #fff; padding: 15px; border-radius: 5px; border: 1px solid #ddd;">
                    <p style="margin: 0;">${message}</p>
                </div>
            </div>
            <div style="text-align: center; margin-top: 20px; font-size: 12px; color: #777;">
                <p>This email was sent from your website's contact form.</p>
            </div>
        </div>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(201).json({ success: true, message: 'Contact saved and email sent successfully' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ success: false, message: 'Contact saved but failed to send email' });
    }
});






