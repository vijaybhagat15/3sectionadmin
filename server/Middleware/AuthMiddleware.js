import { AuthUserModel } from "../Model/AuthModel/authUser.js";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { ErrorHandler } from "../Utils/errorhandler.js"; 
import catchAsyncErrors from "../Utils/catchAsyncErrors.js";

// Load secret keys from environment variables
const superadmin_secret_key = process?.env.SUPERADMIN_JWT_SECRET;

const verifyToken = async (token, secretKey, expectedRole, next) => {
  if (!token) {
    return next(new ErrorHandler(`Unauthorized: Token missing for ${expectedRole}`, 401));
  }

  let decoded;
  try {
    decoded = jwt.verify(token, secretKey);
  } catch (error) {
    return next(new ErrorHandler("Invalid or expired token", 401));
  }

  if (decoded.exp < Date.now() / 1000) {
    return next(new ErrorHandler("Token has expired", 401));
  }

  const user = await AuthUserModel.findById(decoded.id);
  if (!user) {
    return next(new ErrorHandler("Unauthorized: User not found", 401));
  }

  // Optional: Check role if needed
  if (expectedRole && user.role !== expectedRole) {
    return next(new ErrorHandler(`Unauthorized: Token does not belong to a ${expectedRole}`, 403));
  }

  return user; // You can also attach it to req.user in middleware if needed
};

/************************************************************************************
 * Superadmin Middleware
 ************************************************************************************/
export const superAdminMiddleware = catchAsyncErrors(async (req, res, next) => {
  const token = req.cookies?.superadmin;

  if (!token) {
    return next(new ErrorHandler("Unauthorized: No superadmin token provided", 401));
  }

  const user = await verifyToken(token, superadmin_secret_key, "superadmin", next);

  // Attach user to req for further use
  req.user = user;
  next();
});


/************************************************************************************
 * @description Superadmin Middleware
 ************************************************************************************/
export const superadminOradminMiddleware = catchAsyncErrors(async (req, res, next) => {
  let user = null;

  // Check if user is superadmin
  if (req.cookies?.superadmin) {
    user = await verifyToken(req.cookies.superadmin, superadmin_secret_key, "superadmin", next);
  }

  if (!user) {
    return next(new ErrorHandler("Access denied. Unauthorized user.", 401));
  }

  req.user = user;
  next();
});

