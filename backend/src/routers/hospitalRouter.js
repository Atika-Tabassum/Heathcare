const express = require("express");
const hospitalRouter = express.Router();

const { getAllHospital } = require("../controllers/hospitalController");

hospitalRouter.get("/getAllHospital", getAllHospital);

module.exports = hospitalRouter;