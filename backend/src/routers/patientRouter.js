const express = require("express");
const patientRouter = express.Router();
const { registerPatient } = require("../controllers/patientController");

patientRouter.post("/register", registerPatient); // Define the route without `/patient`

module.exports = patientRouter;
