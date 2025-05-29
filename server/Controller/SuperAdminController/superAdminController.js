import "dotenv/config";
import { AuthUserModel } from "../../Model/AuthModel/authUser.js";
import { generateToken } from "../../Utils/jwttoken.js";
import { loginValidationSchema, registrationValidationSchema } from "../../validations/validationSchemas.js";
import catchAsyncErrors from "../../Utils/catchAsyncErrors.js";
import { ErrorHandler } from "../../Utils/errorhandler.js";
import { logger } from "../../Utils/logger.js";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import bcrypt from "bcryptjs";
const superadmin_secrate_key = process.env.SUPERADMIN_JWT_SECRET;

/************************************************************************************
 * @description Superadmin Registration
 ************************************************************************************/
export const superAdminRegistration = catchAsyncErrors(async (req, res, next) => {
  logger.info("Superadmin registration request received.");

  const validatedData = registrationValidationSchema.safeParse(req.body);
  if (!validatedData.success) {
    logger.error("Validation failed for registration.", {
      errors: validatedData.error.errors,
    });
    return next(
      new ErrorHandler("Validation failed", 422, validatedData.error.errors)
    );
  }

  const { firstName, lastName, email, password } = validatedData.data;

  // Check if the email already exists
  const existingUser = await AuthUserModel.findOne({ email });
  if (existingUser) {
    logger.warn("Attempted registration with an already registered email.", {
      email,
    });
    return next(new ErrorHandler("Email is already registered", 409));
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await AuthUserModel.create({
    firstName,
    lastName,
    email,
    password: hashedPassword,
    role: "superadmin",
  });


  logger.info("Superadmin registered successfully.", { userId: newUser._id });

  res.status(201).json({
    success: true,
    message: "Super admin registered successfully",
    user: { id: newUser._id },
  });
  generateToken(newUser, "Superadmin registered successfully", res, superadmin_secrate_key);
});

/************************************************************************************
 * @description Update Superadmin Profile
 ************************************************************************************/
export const updateSuperAdminProfile = catchAsyncErrors(
  async (req, res, next) => {
    logger.info("Profile update request received.", { userId: req.params.id });

    const { firstName, lastName, email, password, mobile, gender } = req.body;
    const userId = req.params.id;

    const user = await AuthUserModel.findById(userId);
    if (!user) {
      logger.error("User not found during profile update.", { userId });
      return next(new ErrorHandler("User not found", 404));
    }
    if (password) {
      user.password = await bcrypt.hash(password, 10);
    }

    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;
    user.email = email || user.email;
    user.mobile = mobile || user.mobile;
    user.gender = gender || user.gender;

    if (req.file) {
      user.userProfile = req.file.path;
    }

    await user.save();
    logger.info("User profile updated successfully.", { userId });

    res.status(200).json({
      success: true,
      message: "User profile updated successfully",
      user,
    });
  }
);

/************************************************************************************
 * @description Superadmin Login
 ************************************************************************************/
export const superAdminLogin = catchAsyncErrors(async (req, res, next) => {
  logger.info("Superadmin login attempt.", { email: req.body.email });

  const validatedData = loginValidationSchema.safeParse(req.body);
  if (!validatedData.success) {
    logger.error("Login validation failed.", {
      errors: validatedData.error.errors,
    });
    return next(new ErrorHandler("Validation failed", 422, validatedData.error.errors));
  }

  const { email, password } = validatedData.data;
  const user = await AuthUserModel.findOne({ email });

  if (!user) {
    logger.error("Login failed. User not found.", { email });
    return next(new ErrorHandler("User not found", 404));
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    logger.warn("Invalid password attempt.", { email });
    return next(new ErrorHandler("Invalid password", 401));
  }

  logger.info("Superadmin logged in successfully.", { userId: user._id });
  generateToken(user, "Logged In Successfully!!", res, superadmin_secrate_key);
});

/************************************************************************************
 * @description Superadmin Logout
 ************************************************************************************/
export const superAdminLogout = catchAsyncErrors(async (req, res) => {
  logger.info("Superadmin logout request received.");

  res.clearCookie("superadmin", {
    httpOnly: true,
    sameSite: "none",
    secure: true,
  });

  logger.info("Superadmin logged out successfully.");
  res.status(200).json({
    success: true,
    message: "Logout successful",
  });
});

/************************************************************************************
 * @description Superadmin Forget Password
 ************************************************************************************/
export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await AuthUserModel.findOne({ email });
    if (!user) return res.status(404).json({ Status: "User not existed" });

    const token = jwt.sign({ id: user._id }, process.env.SUPERADMIN_JWT_SECRET, { expiresIn: "1d" });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Reset Password Link",
      text: `http://localhost:5173/auth/reset_password/${user._id}/${token}`,
    };

    await transporter.sendMail(mailOptions);
    return res.json({ Status: "Success" });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ Status: "Email failed", error });
  }
};

/************************************************************************************
 * @description Superadmin Reset Password
 ************************************************************************************/
export const resetPassword = async (req, res) => {
  const { id, token } = req.params;
  const { password } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.SUPERADMIN_JWT_SECRET);
    const hashedPassword = await bcrypt.hash(password, 10);
    await AuthUserModel.findByIdAndUpdate(id, { password: hashedPassword });
    return res.json({ Status: "Success" });
  } catch (error) {
    return res.status(400).json({ Status: "Error with token or password", error });
  }
};

/************************************************************************************
 * @description get all users
 ************************************************************************************/
export const getAllUser = catchAsyncErrors(async (req, res) => {
  logger.info("Get all user request received.");

  // check redis cache
  const cacheKey = "user:all";
  const cachedUsers = await redisClient.get(cacheKey);
  if (cachedUsers) {
    logger.info("All users fetched from cache.");
    return res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      allUsers: JSON.parse(cachedUsers),
    });
  }

  const allUsers = await AuthUserModel.find({});

  if (!allUsers || allUsers.length === 0) {
    logger.warn("No users found.");
    return next(new ErrorHandler("No users found!", 404));
  }

  await redisClient.setEx(cacheKey, 3600, JSON.stringify(allUsers));
  logger.info("All users fetched successfully.");

  res.status(200).json({
    success: true,
    message: "Users fetched successfully",
    allUsers,
  });
});
