const express = require("express");
const doctorsRouter = express.Router();
const multer = require("multer");

// Multer configuration for storing files
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Specify the directory where uploaded files will be stored
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Maintain the original filename
  },
});

const upload = multer({ storage: storage });

const { getDoctors, registerDoctor, getSpecializations, addSpecialization , getAppointments, updatestatus } = require("../controllers/doctorsController");

doctorsRouter.get("/:userId/viewdoctors", getDoctors);
doctorsRouter.get("/specializations", getSpecializations);
doctorsRouter.post("/register", registerDoctor);
doctorsRouter.post("/specializations", addSpecialization);
doctorsRouter.get("/:userId/viewappointments", getAppointments);
doctorsRouter.post("/updatestatus", updatestatus);

module.exports = doctorsRouter;
