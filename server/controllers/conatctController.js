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
        from: email,
        to: process.env.EMAIL_USER,
        subject: `New Contact Form Submission: ${subject}`,
        html: `
          <html>
            <head>
              <style>
                body {
                  font-family: 'Poppins', sans-serif;
                  background-color: #f0f8ff;
                  margin: 0;
                  padding: 0;
                }
                .container {
                  max-width: 600px;
                  margin: 50px auto;
                  background: #ffffff;
                  border-radius: 16px;
                  padding: 40px;
                  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
                }
                .header {
                  text-align: center;
                  color: #0047ab;
                  font-size: 28px;
                  margin-bottom: 20px;
                }
                .divider {
                  border: none;
                  border-top: 2px solid #ddd;
                  margin: 25px 0;
                }
                .info p {
                  font-size: 18px;
                  margin: 10px 0;
                  color: #333;
                }
                .info strong {
                  color: #0047ab;
                }
                .message-box {
                  background: #eef7ff;
                  padding: 20px;
                  border: 1px solid #cce7ff;
                  border-radius: 12px;
                  margin-top: 20px;
                  font-size: 16px;
                }
                .footer {
                  text-align: center;
                  font-size: 14px;
                  color: #666;
                  margin-top: 40px;
                }
              </style>
            </head>
            <body>
              <div class="container">
                <h2 class="header">New Contact Form Submission</h2>
                <hr class="divider" />
                <div class="info">
                  <p><strong>Name:</strong> ${name}</p>
                  <p><strong>Email:</strong> ${email}</p>
                  <p><strong>Subject:</strong> ${subject}</p>
                </div>
                <div class="message-box">
                  <p>${message}</p>
                </div>
              </div>
              <div class="footer">
                <p>This email was sent from your website's contact form.</p>
              </div>
            </body>
          </html>
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






