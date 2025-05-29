//server\Model\AuthModel\authUser.js
import mongoose from "mongoose";

const authUserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    mobile: {
      type: String,
      unique: true,
      sparse: true, // Allows multiple null values
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
      required: false,
    },
    password: {
      type: String,
      required: true,
    },
    userProfile: {
      type: String,
      default:
        "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y",
    },
    role: {
      type: String,
      enum: ["superadmin"],
      default: "superadmin",
    },
    status: {
      type: String,
      enum: ["active", "inactive", "block"],
      default: "active",
    },
    lastLogin: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);
export const AuthUserModel = mongoose.model("authUser", authUserSchema);
