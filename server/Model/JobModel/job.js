// server/Model/JobModel/job.js
import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    jobTitle: {
      type: String,
      required: true,
    },
    jobDescription: {
      type: String,
      required: true,
    },
    company_logo: {
      type: String,
      default: "",
    },
    company_name: {
      type: String,
      required: true,
    },
    payAmount: {
      type: String,
      default: "",
    },
    timing: {
      type: String,
      default: "",
    },
    experienceRequired: {
      type: String,
      default: "",
    },
    role: {
      type: String,
      default: "",
    },
    location: {
      type: String,
      required: true,
    },
    department: {
      type: String,
      default: "",
    },
    employment_type: {
      type: String,
      default: "",
    },
    education: {
      type: String,
      default: "",
    },
    skills: {
      type: [String],
      default: [],
    },
    open_positions: {
      type: Number,
      default: 0,
  
    },
  },
  {
    timestamps: true,
  }
);

export const JobModel = mongoose.model("Job", jobSchema);
