import rateLimit from "express-rate-limit";

// General rate limiter for API routes
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 10, 
  message: "Too many requests from this IP, please try again later.",
});
const authLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, 
  max: 5, 
  message: "Too many login attempts, please try again later.",
});

const loginLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, 
  max: 5, 
  message: 'Too many login attempts. Please try again later.',
});

export  {
  apiLimiter,
  authLimiter,
  loginLimiter
};
