const express = require("express");
const doctorsRouter = express.Router();

const { getDoctors, registerDoctor, getSpecializations, addSpecialization , getAppointments } = require("../controllers/doctorsController");

doctorsRouter.get("/:userId/viewdoctors", getDoctors);
doctorsRouter.get("/specializations", getSpecializations);
doctorsRouter.post("/register", registerDoctor);
doctorsRouter.post("/specializations", addSpecialization);
doctorsRouter.get("/:userId/viewappointments", getAppointments);

module.exports = doctorsRouter;
