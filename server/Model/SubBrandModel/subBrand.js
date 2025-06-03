// server/Model/SubBrandModel/subBrand.js
import mongoose from "mongoose";

const subBrandSchema = new mongoose.Schema(
  {
    logo: {
      type: String,
    },
    name: {
      type: String,
    },
    description: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

export const SubBrandModel = mongoose.model("SubBrand", subBrandSchema);
