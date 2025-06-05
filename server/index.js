// server/index.js
import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import session from "express-session";
import rateLimit from "express-rate-limit";

import Database from "./Db/Database.js";
import errorMiddleware from "./Middleware/error.js";
import { logRequest, logger } from "./Utils/logger.js";
import { RedisStore } from "connect-redis";
import redisClient from "./config/redis.js";
import securityConfig from "./config/security.js";

// 🔹 Import routes
import jobRouter from "./Routes/jobRoutes/jobRouter.js";
import subbrandRouter from "./Routes/SubBrandRoutes/subbrandRouter.js";
import partnerRouter from "./Routes/partnerRoutes/partnerRoutes.js";
import superadminRouter from "./Routes/SuperAdmin/superAdminRoutes.js";
import checkAuthRouter from "./Routes/CheckAuth/checkAuth.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

// 🔹 CORS Configuration
const corsOptions = {
  origin: ["http://localhost:5173", "http://localhost:5174", "http://localhost:5176"],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

// 🔹 Middleware
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cors(corsOptions));
app.use(cookieParser());
securityConfig(app);
app.use(logRequest);

// 🔹 Redis Session
app.use(
  session({
    store: new RedisStore({ client: redisClient }),
    secret: process.env.SESSION_SECRET || "SESSION_SECRET=my_secret_key",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, maxAge: 3600000 },
  })
);

// 🔹 Rate Limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests from this IP, please try again later.",
  keyGenerator: (req) => req.ip,
});
app.use(limiter);

// 🔹 Connect to DB
Database();

// 🔹 Routes
app.use("/api/v1/superadmin", superadminRouter);
app.use("/api/v1/auth", checkAuthRouter);
app.use("/api/v1/job", jobRouter);
app.use("/api/v1/subbrand", subbrandRouter);
app.use("/api/v1/partner", partnerRouter);

// 🔹 Error Handling Middleware
app.use(errorMiddleware);

// 🔹 404 Fallback Route
app.use("/*", (req, res) => {
  return res.status(404).json({
    success: false,
    message: "Path not found!",
  });
});

// 🔹 Global Error Handlers
process.on("uncaughtException", (err) => {
  logger.error("Uncaught Exception:", { message: err.message, stack: err.stack });
  process.exit(1);
});

process.on("unhandledRejection", (reason, promise) => {
  logger.error("Unhandled Promise Rejection:", { reason, promise });
});

// 🔹 Start Server
app.listen(PORT, (err) => {
  if (err) console.log(err.message);
  console.log(`✅ Server is running on port ${PORT}`);
});
