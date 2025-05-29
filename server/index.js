// server\index.js
import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import Database from "../server/Db/Database.js";
import errorMiddleware from "./Middleware/error.js";
import rateLimit from "express-rate-limit";
import { logRequest, logger } from "./Utils/logger.js";
import session from "express-session";
import { RedisStore } from "connect-redis";
import redisClient from "./config/redis.js";
import dotenv from "dotenv";
import securityConfig from "./config/security.js";
import { AuthUserModel } from "./Model/AuthModel/authUser.js";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import bcrypt from "bcryptjs";

// importing base routes
import superadminRouter from "./Routes/SuperAdmin/superAdminRoutes.js";
import checkAuthRouter from "./Routes/CheckAuth/checkAuth.js";

const PORT = process.env.PORT || 8000;
const corsOptions = {
  origin: ["http://localhost:5173", "http://localhost:5174", "http://localhost:5176"],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

dotenv.config();

const app = express();
app.use(express.json());
securityConfig(app);

// 🔹 Redis Session Store
app.use(
  session({
    store: new RedisStore({ client: redisClient }),
    secret: process.env.SESSION_SECRET || "SESSION_SECRET=my_secret_key",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, maxAge: 3600000 },
  })
);


// ✅ Increased Payload Size for Large Images
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(errorMiddleware);
app.use(logRequest);

// db connections
Database();

// api routes
app.use("/api/v1/superadmin", superadminRouter);
app.use("/api/v1/auth", checkAuthRouter);



app.use((err, req, res, next) => {
  return res.status(500).json({
    success: false,
    message: err.message,
  });
});

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests from this IP, please try again later.",
  keyGenerator: (req) => req.ip,
});
app.use(limiter);

// server listening
app.listen(PORT, (err) => {
  if (err) console.log(err.message);
  console.log(`Server is up and running on port ${PORT}`);
});
process.on("uncaughtException", (err) => {
  logger.error("Uncaught Exception:", { message: err.message, stack: err.stack });
  process.exit(1); // Optional: Exit process
});

process.on("unhandledRejection", (reason, promise) => {
  logger.error("Unhandled Promise Rejection:", { reason, promise });
});

// app.post('/forgot-password', (req, res) => {
//     const {email} = req.body;
//     AuthUserModel.findOne({email: email})
//     .then(user => {
//         if(!user) {
//             return res.send({Status: "User not existed"})
//         } 
//         const token = jwt.sign({id: user._id}, process.env.SUPERADMIN_JWT_SECRET, {expiresIn: "1d"})
//         var transporter = nodemailer.createTransport({
//             service: 'gmail',
//             auth: {
//                 user: process.env.EMAIL_USER,
//                 pass: process.env.EMAIL_PASS,
//             }
//           });
          
//           var mailOptions = {
//             from: process.env.EMAIL_USER,
//             to: email,
//             subject: 'Reset Password Link',
//             text: `http://localhost:5173/reset_password/${user._id}/${token}`
//           };
          
//           transporter.sendMail(mailOptions, function(error, info){
//             if (error) {
//               console.log(error);
//               return res.status(500).json({ Status: "Email failed", error });

//             } else {
//               return res.send({Status: "Success"})
//             }
//           });
//     })
// })

// app.post('/reset-password/:id/:token', (req, res) => {
//     const {id, token} = req.params
//     const {password} = req.body

//     jwt.verify(token, process.env.SUPERADMIN_JWT_SECRET, (err, decoded) => {
//         if(err) {
//             return res.json({Status: "Error with token"})
//         } else {
//             bcrypt.hash(password, 10)
//             .then(hash => {
//                 AuthUserModel.findByIdAndUpdate({_id: id}, {password: hash})
//                 .then(u => res.send({Status: "Success"}))
//                 .catch(err => res.send({Status: err}))
//             })
//             .catch(err => res.send({Status: err}))
//         }
//     })
// })

// default route
app.use("/*", (req, res) => {
  return res.status(404).json({
    success: false,
    message: "path not found!!",
  });
});