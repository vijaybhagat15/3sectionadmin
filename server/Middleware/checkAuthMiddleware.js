//server\Middleware\checkAuthMiddleware.js
import { AuthUserModel } from "../Model/AuthModel/authUser.js";
import jwt from "jsonwebtoken";
import "dotenv/config";
import redisClient from "../config/redis.js";
import { ErrorHandler } from "../Utils/errorhandler.js";

const roleSecretKeys = {
  superadmin: process.env.SUPERADMIN_JWT_SECRET,
  // Add other roles as needed (teacher, student, etc.)
};

export const checkAuthMiddleware = async (req, res, next) => {
  try {
    const role = Object.keys(roleSecretKeys).find((r) => req.cookies[r]);

    if (!role) {
      return next(new ErrorHandler("Unauthorized - No token found", 401));
    }

    const token = req.cookies[role];
    const secretKey = roleSecretKeys[role];

    if (!token || !secretKey) {
      return next(new ErrorHandler("Unauthorized - Invalid token", 401));
    }

    // Check Redis cache for user data
    const cachedUser = await redisClient.get(`auth_user:${token}`);
    if (cachedUser) {
      req.user = JSON.parse(cachedUser);
      return next();
    }

    const decoded = jwt.verify(token, secretKey);
    const user = await AuthUserModel.findById(decoded.id)
      .select("-password")
      .lean()
      .exec();

    if (!user) {
      return next(new ErrorHandler("Unauthorized - User not found", 401));
    }

    // Store user in Redis for 1 hour
    await redisClient.setEx(`auth_user:${token}`, 3600, JSON.stringify(user));

    req.user = user;
    next();
  } catch (error) {
    return next(new ErrorHandler("Unauthorized - Authentication failed", 401));
  }
};
