import express from "express";
import {
  getAllUser,
  superAdminForgetpassword,
  superAdminLogin,
  superAdminLogout,
  superAdminRegistration,
  superAdminResetpassword,
  updateSuperAdminProfile,
} from "../../Controller/SuperAdminController/superAdminController.js";
import { superAdminMiddleware } from "../../Middleware/AuthMiddleware.js";
import { loginLimiter } from "../../Middleware/rateLimiter.js";
const superadminRouter = express.Router();
superadminRouter.post("/auth/signup", superAdminRegistration);
superadminRouter.post("/auth/signin", superAdminLogin);
superadminRouter.get("/auth/logout", superAdminMiddleware, superAdminLogout);
superadminRouter.post("/auth/forget-password", superAdminForgetpassword);
superadminRouter.post("/auth/reset-password/:token", superAdminResetpassword);
superadminRouter.get("/get-all-users",superAdminMiddleware, getAllUser);
export default superadminRouter;
