//server\Routes\jobRoutes\jobRouter.js
import express from "express";
import {addjob,getAlljob, getjobById,updatejob,deletejob,} from "../../Controller/JobController/JobController.js"; 
import { superAdminMiddleware } from "../../Middleware/AuthMiddleware.js"; 

const jobRouter = express.Router();

// Routes
jobRouter.post("/add-job", superAdminMiddleware, addjob);
// jobRouter.post("/add-job", addjob);

jobRouter.get("/get-all-job", getAlljob);
jobRouter.get("/get-job/:id", getjobById);
jobRouter.put("/update-job/:id", superAdminMiddleware, updatejob);
// jobRouter.put("/update-job/:id", updatejob);

jobRouter.delete("/delete-job/:id", superAdminMiddleware, deletejob);
//  jobRouter.delete("/delete-job/:id", deletejob);


export default jobRouter;
