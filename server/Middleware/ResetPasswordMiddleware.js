//server\Middleware\ResetPasswordMiddleware.js
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { AuthUserModel } from "../Model/AuthModel/authUser.js";
import { ErrorHandler } from "../Utils/errorhandler.js";
import catchAsyncErrors from "../Utils/catchAsyncErrors.js";

/************************************************************************************
 * Password Reset Middleware
 ************************************************************************************/
const passwordResetMiddleware = (role) => {
  return catchAsyncErrors(async (req, res, next) => {
    const { token } = req.params;
    const { password } = req.body;

    if (!password) {
      return next(new ErrorHandler("Password is required", 400));
    }

    let secretKey;
    if (role === "superadmin") {
      secretKey = process.env.SUPERADMIN_JWT_SECRET;
    }else {
      return next(new ErrorHandler("Invalid role", 400));
    }

    const decoded = jwt.verify(token, secretKey);
    const user = await AuthUserModel.findOne({ email: decoded.email });

    if (!user) {
      return next(new ErrorHandler("User not found", 404));
    }

    // Hash new password and update user
    user.password = await bcrypt.hash(password, 10);
    await user.save();

    res.status(200).json({
      success: true,
      message: "Password reset successfully!",
    });
  });
};

export default passwordResetMiddleware;
