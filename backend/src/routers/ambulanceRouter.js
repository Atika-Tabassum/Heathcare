const express = require("express");
const ambulanceRouter = express.Router();

const { getAmbulance } = require("../controllers/ambulanceController");

ambulanceRouter.get("/:patientUserId/:hospitalUserId/bookAmbulance", getAmbulance);

module.exports = ambulanceRouter;