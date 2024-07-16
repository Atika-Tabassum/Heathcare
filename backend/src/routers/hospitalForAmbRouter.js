const express = require("express");
const hospitalForAmbRouter = express.Router();

const { getAllHospital } = require("../controllers/hospitalForAmbController");

hospitalForAmbRouter.get("/getAllHospital", getAllHospital);

module.exports = hospitalForAmbRouter;