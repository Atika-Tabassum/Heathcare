const express = require("express");
const doctorsRouter = express.Router();

const { getDoctors } = require("../controllers/doctorsController");

doctorsRouter.get("/:userId/viewdoctors", getDoctors);

module.exports = doctorsRouter;