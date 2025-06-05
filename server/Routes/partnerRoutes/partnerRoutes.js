//server\Routes\partnerRoutes\partnerRoutes.js
import express from "express";
import {addPartner,getAllPartners,getPartnerById,updatePartner,deletePartner,} from "../../Controller/PartnerController/partnerController.js";
import { superAdminMiddleware } from "../../Middleware/AuthMiddleware.js";
const partnerRouter = express.Router();

// Routes
partnerRouter.post("/add-partner", superAdminMiddleware, addPartner);

partnerRouter.get("/get-all-partners", getAllPartners);
partnerRouter.get("/get-partner/:id", getPartnerById);
partnerRouter.put("/update-partner/:id", superAdminMiddleware, updatePartner);

partnerRouter.delete("/delete-partner/:id", superAdminMiddleware, deletePartner);

export default partnerRouter;
