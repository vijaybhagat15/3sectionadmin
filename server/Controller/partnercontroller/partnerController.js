//server\Controller\partnercontroller\partnerController.js
import { PartnerModel } from "../../Model/PartnerModel/partner.js";
import { ErrorHandler } from "../../Utils/errorhandler.js";

// ✅ Add a new partner
export const addPartner = async (req, res, next) => {
  try {
    const { companyName, logo } = req.body;

    if (!companyName || !logo) {
      return next(new ErrorHandler("Company name and logo are required.", 400));
    }

    // Prevent duplicate partner
    const existingPartner = await PartnerModel.findOne({ companyName });
    if (existingPartner) {
      return next(new ErrorHandler("Partner already exists.", 400));
    }

    const newPartner = new PartnerModel({ companyName, logo });
    await newPartner.save();

    res.status(201).json({
      success: true,
      message: "Partner added successfully",
      partner: newPartner,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error adding partner",
      error: error.message,
    });
  }
};

// ✅ Get all partners
export const getAllPartners = async (req, res) => {
  try {
    const partners = await PartnerModel.find();
    res.status(200).json(partners);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching partners",
      error: error.message,
    });
  }
};

// ✅ Get partner by ID
export const getPartnerById = async (req, res, next) => {
  try {
    const partner = await PartnerModel.findById(req.params.id);
    if (!partner) {
      return next(new ErrorHandler("Partner not found", 404));
    }

    res.status(200).json({
      success: true,
      message: "Partner fetched successfully",
      partner,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching partner",
      error: error.message,
    });
  }
};

// ✅ Update partner
export const updatePartner = async (req, res, next) => {
  try {
    const updatedPartner = await PartnerModel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!updatedPartner) {
      return next(new ErrorHandler("Partner not found", 404));
    }

    res.status(200).json({
      success: true,
      message: "Partner updated successfully",
      partner: updatedPartner,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating partner",
      error: error.message,
    });
  }
};

// ✅ Delete partner
export const deletePartner = async (req, res, next) => {
  try {
    const deletedPartner = await PartnerModel.findByIdAndDelete(req.params.id);
    if (!deletedPartner) {
      return next(new ErrorHandler("Partner not found", 404));
    }

    res.status(200).json({
      success: true,
      message: "Partner deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting partner",
      error: error.message,
    });
  }
};
