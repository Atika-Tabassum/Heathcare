const express = require("express");
const orgmedicalcampRouter = express.Router();

const { getMedicalCamp } = require("../controllers/orgmedicalcampController");

orgmedicalcampRouter.post("/:userId/orgmedicalcamp", getMedicalCamp);

module.exports = orgmedicalcampRouter;