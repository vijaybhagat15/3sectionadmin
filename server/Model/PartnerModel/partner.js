// server/Model/PartnerModel/partner.js
import mongoose from "mongoose";

const partnerSchema = new mongoose.Schema(
  {
    logo: {
      type: String,
      required: true,
    },
    companyName: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const PartnerModel = mongoose.model("Partner", partnerSchema);
