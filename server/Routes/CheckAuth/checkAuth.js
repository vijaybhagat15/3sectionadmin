//server\Routes\CheckAuth\checkAuth.js
import express from "express";
import { checkAuthMiddleware } from "../../Middleware/checkAuthMiddleware.js";

const checkAuthRouter = express.Router();

checkAuthRouter.get("/check-auth", checkAuthMiddleware, (req, res) => {
  res.status(200).json({
    success: true,
    message: "Authorized",
    user: req.user, // Sends user details
  });
});

export default checkAuthRouter;
