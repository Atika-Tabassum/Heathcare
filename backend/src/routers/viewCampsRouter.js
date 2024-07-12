const express = require("express");
const viewCampRouter = express.Router();

const { getCamps } = require("../controllers/viewCampsController");

viewCampRouter.get("/:userId/org_camps", getCamps);

module.exports = viewCampRouter;