//server\Routes\SubBrandRoutes\subbrandRouter.js
import express from "express";
import {addSubBrand,getAllSubBrands, getSubBrandById,updateSubBrand,deleteSubBrand,}from "../../Controller/SubbrandController/SubbrandController.js";  
import { superAdminMiddleware } from "../../Middleware/AuthMiddleware.js"; 

const subbrandRouter = express.Router();
// Routes
subbrandRouter.post("/add-subbrand", superAdminMiddleware, addSubBrand);

subbrandRouter.get("/get-all-subbrand", getAllSubBrands);
subbrandRouter.get("/get-subbrand/:id", getSubBrandById);
subbrandRouter.put("/update-subbrand/:id", superAdminMiddleware, updateSubBrand);

subbrandRouter.delete("/delete-subbrand/:id", superAdminMiddleware, deleteSubBrand);
export default subbrandRouter;
