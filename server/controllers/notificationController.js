import { asyncHandler } from '../utils/asyncHandler.js';
import nodemailer from 'nodemailer';

// Configure the transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Notification controller
export const notify = asyncHandler(async (req, res) => {
  const { productName, productId, recipientEmail } = req.body;

console.log(req.body);


  // Validate incoming data
  if (!productName || !productId) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  console.log('Notification Request:', req.body);

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    subject: 'Product Out of Stock Alert',
    html: `
      <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              margin: 0;
              padding: 0;
              background-color: #f4f4f4;
            }
            .email-container {
              width: 100%;
              max-width: 600px;
              margin: 0 auto;
              background-color: #ffffff;
              border-radius: 8px;
              padding: 20px;
              box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            }
            .header {
              text-align: center;
              color: #333;
              padding-bottom: 20px;
            }
            .header h1 {
              font-size: 24px;
              margin: 0;
            }
            .content {
              font-size: 16px;
              color: #555;
              line-height: 1.5;
            }
            .product-info {
              background-color: #f9f9f9;
              border: 1px solid #ddd;
              padding: 15px;
              margin-top: 20px;
              border-radius: 4px;
            }
            .product-info p {
              margin: 0;
              font-weight: bold;
            }
            .footer {
              margin-top: 30px;
              text-align: center;
              font-size: 14px;
              color: #888;
            }
          </style>
        </head>
        <body>
          <div class="email-container">
            <div class="header">
              <h1>Product Out of Stock Alert</h1>
            </div>
            <div class="content">
              <p>Hello,</p>
              <p>We wanted to notify you that the following product is currently out of stock:</p>
              <div class="product-info">
                <p>Product Name: ${productName}</p>
                <p>Product ID: ${productId}</p>
              </div>
              <p>Please take necessary action.</p>
              <p>Thank you for your attention.</p>
            </div>
            <div class="footer">
              <p>&copy; 2025 brighbyte. All rights reserved.</p>
            </div>
          </div>
        </body>
      </html>
    `
  };
  
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
    res.status(200).json({ message: 'Notification email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Failed to send notification email' });
  }
});
