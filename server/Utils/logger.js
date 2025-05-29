import winston from "winston";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config(); // Load environment variables

// Define __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure logs directory exists
const logDirectory = path.join(__dirname, "../logs");
if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory, { recursive: true });
}

// Define a custom log format
const logFormat = winston.format.combine(
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  winston.format.printf(({ timestamp, level, message, ...metadata }) => {
    const metaString = Object.keys(metadata).length ? ` ${JSON.stringify(metadata)}` : "";
    return `${timestamp} [${level.toUpperCase()}]: ${message}${metaString}`;
  })
);
// const LOG_TO_FILE = true
const logToFile = process.env.LOG_TO_FILE === "true"; // Convert to boolean properly
console.log("File logging is enabled:", logToFile);

// Create logger instance
const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || "info",
  format: logFormat,
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(winston.format.colorize(), logFormat),
    }),
    ...(logToFile
      ? [
          new winston.transports.File({ filename: path.join(logDirectory, "error.log"), level: "error" }),
          new winston.transports.File({ filename: path.join(logDirectory, "combined.log") }),
        ]
      : []),
  ],
});

// Middleware to log requests
const logRequest = (req, res, next) => {
  const startTime = Date.now();
  res.on("finish", () => {
    const duration = Date.now() - startTime;
    logger.info(`${req.method} ${req.originalUrl}`, {
      status: res.statusCode,
      duration: `${duration}ms`,
      ip: req.ip,
    });
  });
  next();
};

// Function to log errors with request context
const logError = (err, req) => {
  logger.error(err.message, {
    stack: err.stack,
    method: req.method,
    url: req.originalUrl,
    ip: req.ip,
  });
};

// Handle uncaught exceptions & unhandled promise rejections
process.on("uncaughtException", (err) => {
  logger.error("Uncaught Exception:", { message: err.message, stack: err.stack });
  // Instead of exiting immediately, consider handling errors gracefully
  setTimeout(() => process.exit(1), 1000);
});

process.on("unhandledRejection", (reason, promise) => {
  logger.error("Unhandled Promise Rejection:", { reason, promise });
});

export { logger, logRequest, logError };
