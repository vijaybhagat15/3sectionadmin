//server\Controller\JobController\JobController.js
import { JobModel } from "../../Model/JobModel/job.js";
import { ErrorHandler } from "../../Utils/errorhandler.js";

// ✅ Add a new job
export const addjob = async (req, res, next) => {
  try {
    const {jobTitle,jobDescription, company_logo,company_name,payAmount,timing,experienceRequired,role,location,department,employment_type,education,skills,open_positions,
          } = req.body;

    // Require at least minimal required fields
    if (!jobTitle || !jobDescription || !company_name || !location) {
      return next(
        new ErrorHandler(
          "jobTitle, jobDescription, company_name, and location are required.",
          400
        )
      );
    }

    // Optional: Prevent duplicate jobTitle
    const existingJob = await JobModel.findOne({ jobTitle });
    if (existingJob) {
      return next(new ErrorHandler("Job with this title already exists.", 400));
    }

    const newJob = new JobModel({
      jobTitle,
      jobDescription,
      company_logo,
      company_name,
      payAmount,
      timing,
      experienceRequired,
      role,
      location,
      department,
      employment_type,
      education,
      skills,
      open_positions,
    });

    await newJob.save();

    res.status(201).json({
      success: true,
      message: "Job added successfully",
      job: newJob,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error adding job",
      error: error.message,
    });
  }
};

// ✅ Get all jobs
export const getAlljob = async (req, res) => {
  try {
    const jobs = await JobModel.find();
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching jobs",
      error: error.message,
    });
  }
};

// ✅ Get job by ID
export const getjobById = async (req, res, next) => {
  try {
    const job = await JobModel.findById(req.params.id);
    if (!job) {
      return next(new ErrorHandler("Job not found", 404));
    }
    res.status(200).json({
      success: true,
      message: "Job fetched successfully",
      job,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching job",
      error: error.message,
    });
  }
};

// ✅ Update job
export const updatejob = async (req, res, next) => {
  try {
    const updatedJob = await JobModel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!updatedJob) {
      return next(new ErrorHandler("Job not found", 404));
    }

    res.status(200).json({
      success: true,
      message: "Job updated successfully",
      job: updatedJob,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating job",
      error: error.message,
    });
  }
};

// ✅ Delete job
export const deletejob = async (req, res, next) => {
  try {
    const deletedJob = await JobModel.findByIdAndDelete(req.params.id);
    if (!deletedJob) {
      return next(new ErrorHandler("Job not found", 404));
    }

    res.status(200).json({
      success: true,
      message: "Job deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting job",
      error: error.message,
    });
  }
};
