const express = require("express");
const campRouter = express.Router();
const { getCamps } = require("../controllers/CampController");

campRouter.get("/camps", getCamps);

module.exports = campRouter;