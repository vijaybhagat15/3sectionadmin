import redisClient from "../config/redis.js";
import { ErrorHandler } from "../Utils/errorhandler.js";
import catchAsyncErrors from "../Utils/catchAsyncErrors.js";

export const cacheMiddleware = catchAsyncErrors(async (req, res, next) => {
  try {
    const key = `all:${req.params.id}`;
    const cachedData = await redisClient.get(key);

    if (cachedData) {
      return res.json(JSON.parse(cachedData)); // Return cached response
    }

    next(); // Proceed to controller
  } catch (error) {
    return next(new ErrorHandler("Redis cache error", 500));
  }
});
