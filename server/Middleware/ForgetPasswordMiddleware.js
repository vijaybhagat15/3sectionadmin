//server\Middleware\ForgetPasswordMiddleware.js
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import { AuthUserModel } from "../Model/AuthModel/authUser.js";
import { ErrorHandler } from "../Utils/errorhandler.js"; 
import catchAsyncErrors from "../Utils/catchAsyncErrors.js";

/************************************************************************************
 * Password Forget Middleware
 ************************************************************************************/
const passwordForgetMiddleware = (role) => {
  return catchAsyncErrors(async (req, res, next) => {
    const { email } = req.body;

    if (!email) {
      return next(new ErrorHandler("Email is required", 400));
    }

    const user = await AuthUserModel.findOne({ email });
    if (!user) {
      return next(new ErrorHandler("User not found", 404));
    }

    // Choosing the appropriate JWT secret based on the role
    let secretKey;
    if (role === "superadmin") {
      secretKey = process.env.SUPERADMIN_JWT_SECRET;
    }else {
      return next(new ErrorHandler("Invalid role", 400));
    }

    // Generate reset token
    const token = jwt.sign({ email }, secretKey, { expiresIn: "1h" });

    // Configure Nodemailer
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: process.env.SMPT_MAIL, pass: process.env.SMPT_PASSWORD },
    });

    const mailOptions = {
      from: process.env.SMPT_MAIL,
      to: email,
      subject: "Password Reset",
      text: `Click here to reset your password: http://localhost:${process.env.PORT}/auth/reset-password/${token}`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({
      success: true,
      message: "Email sent successfully",
    });
  });
};

export default passwordForgetMiddleware;
