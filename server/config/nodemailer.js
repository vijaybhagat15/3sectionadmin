import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false, // Set to true for 465, false for other ports
  service: process.env.SMTP_SERVICE, // Optional service (e.g., "gmail")
  auth: {
    user: process.env.SMTP_MAIL , // Your email
    pass: process.env.SMTP_PASSWORD , // Your email password or app password
  },
});

/**
 * Send an email
 * @param {Object} options - Email configuration
 * @param {string} options.to - Recipient email
 * @param {string} options.subject - Email subject
 * @param {string} options.text - Plain text content
 * @param {string} [options.html] - Optional HTML content
 */
export const sendEmail = async ({ to, subject, text, html }) => {
  try {
    const mailOptions = {
      from: process.env.SMTP_MAIL ,
      to,
      subject,
      text,
      html, // HTML content if provided
    };

    await transporter.sendMail(mailOptions);
    console.log(`📧 Email sent successfully to: ${to}`);
  } catch (error) {
    console.log(error)
    console.error(`❌ Error sending email to ${to}:`, error.message);
  }
};
