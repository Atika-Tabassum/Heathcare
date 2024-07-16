const express = require("express");
const ambulanceRouter = express.Router();

const { getAmbulance } = require("../controllers/ambulanceController");

ambulanceRouter.post("/bookAmbulance", getAmbulance);

module.exports = ambulanceRouter;