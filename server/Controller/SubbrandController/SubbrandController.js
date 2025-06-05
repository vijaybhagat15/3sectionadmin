import { SubBrandModel } from "../../Model/SubBrandModel/subBrand.js";
import { ErrorHandler } from "../../Utils/errorhandler.js";

// ✅ Add a new subbrand
export const addSubBrand = async (req, res, next) => {
  try { 
    const { name, description, logo } = req.body;

    // Validate required fields
    if (!name) {
      return next(new ErrorHandler("Subbrand name is required.", 400));
    }

    // Prevent duplicate subbrand by name
    const existingSubBrand = await SubBrandModel.findOne({ name });
    if (existingSubBrand) {
      return next(new ErrorHandler("Subbrand already exists.", 400));
    }

    const newSubBrand = new SubBrandModel({
      name,
      description,
      logo,
    });

    await newSubBrand.save();

    res.status(201).json({
      success: true,
      message: "Subbrand added successfully",
      subbrand: newSubBrand,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error adding subbrand",
      error: error.message,
    });
  }
};

// ✅ Get all subbrands
export const getAllSubBrands = async (req, res) => {
  try {
    const subbrands = await SubBrandModel.find();
    res.status(200).json(subbrands);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching subbrands",
      error: error.message,
    });
  }
};

// ✅ Get subbrand by ID
export const getSubBrandById = async (req, res, next) => {
  try {
    const subbrand = await SubBrandModel.findById(req.params.id);
    if (!subbrand) {
      return next(new ErrorHandler("Subbrand not found", 404));
    }

    res.status(200).json({
      success: true,
      message: "Subbrand fetched successfully",
      subbrand,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching subbrand",
      error: error.message,
    });
  }
};

// ✅ Update subbrand
export const updateSubBrand = async (req, res, next) => {
  try {
    const updatedSubBrand = await SubBrandModel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!updatedSubBrand) {
      return next(new ErrorHandler("Subbrand not found", 404));
    }

    res.status(200).json({
      success: true,
      message: "Subbrand updated successfully",
      subbrand: updatedSubBrand,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating subbrand",
      error: error.message,
    });
  }
};

// ✅ Delete subbrand
export const deleteSubBrand = async (req, res, next) => {
  try {
    const deletedSubBrand = await SubBrandModel.findByIdAndDelete(req.params.id);
    if (!deletedSubBrand) {
      return next(new ErrorHandler("Subbrand not found", 404));
    }

    res.status(200).json({
      success: true,
      message: "Subbrand deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting subbrand",
      error: error.message,
    });
  }
};
