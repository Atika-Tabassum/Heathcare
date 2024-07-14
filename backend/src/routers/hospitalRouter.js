const express = require("express");
const hospitalRouter = express.Router();
const pool = require("../../db");
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

const { registerHospital } = require("../controllers/hospitalController");

// POST /hospital/register
hospitalRouter.post("/register", upload.single("image"), registerHospital);

module.exports = hospitalRouter;
