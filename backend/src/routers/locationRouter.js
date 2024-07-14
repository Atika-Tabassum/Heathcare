const express = require("express");

const locationRouter= express.Router();
const { getDivisions, getDistrictsByDivision, getUpazilasByDistrict } = require("../controllers/locationController");

// Route to get all divisions
locationRouter.get("/divisions", getDivisions);

// Route to get districts by division ID
locationRouter.get("/districts/:divisionId", getDistrictsByDivision);

// Route to get upazilas by district ID
locationRouter.get("/upazilas/:districtId", getUpazilasByDistrict);

module.exports = locationRouter;
